import { FC, ReactNode, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { PostWithPartialRelations } from '@api-contracts';

import { apiClient } from '../../app/page';

import PostCard from './PostCard';
import ConfirmModal from './ConfirmModal';

interface Props {
    posts: PostWithPartialRelations[];
    showControls?: boolean;
    hasMore: boolean;
    next(): void;
    dataLength: number;
    loader?: ReactNode;
    onPostRemoved(post: PostWithPartialRelations): void;
}

const InfiniteScrollPosts: FC<Props> = ({
    posts,
    showControls,
    hasMore,
    next,
    dataLength,
    loader,
    onPostRemoved,
}): JSX.Element => {
    const [removing, setRemoving] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [postToRemove, setPostToRemove] = useState<PostWithPartialRelations | null>(null);

    const handleOnDeleteClick = (post: PostWithPartialRelations) => {
        setPostToRemove(post);
        setShowConfirmModal(true);
    };

    const handleDeleteCancel = () => {
        setShowConfirmModal(false);
    };

    const handleOnDeleteConfirm = async () => {
        if (!postToRemove) return handleDeleteCancel();

        setShowConfirmModal(false);
        setRemoving(true);

        const { mutate } = apiClient.content.deletePost.useMutation({
            onSuccess: () => {
                console.log('delete success');
                onPostRemoved(postToRemove);
            },
            onSettled: () => {
                setRemoving(false);
            },
        });
        mutate({
            params: {
                id: postToRemove.id,
            },
        });

        return undefined;
    };
    const defaultLoader = (
        <p className="p-3 text-secondary-dark opacity-50 text-center font-semibold text-xl animate-pulse">
            Loading...
        </p>
    );

    return (
        <>
            <InfiniteScroll
                hasMore={hasMore}
                next={next}
                dataLength={dataLength}
                loader={loader || defaultLoader}
            >
                <div className="max-w-4xl mx-auto p-3">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {posts.map((post, index) => (
                            <PostCard
                                key={post.slug}
                                post={post}
                                controls={showControls}
                                onDeleteClick={() => handleOnDeleteClick(post)}
                                busy={post.id === postToRemove?.id && removing}
                            />
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
            <ConfirmModal
                visible={showConfirmModal}
                onClose={handleDeleteCancel}
                onCancel={handleDeleteCancel}
                onConfirm={handleOnDeleteConfirm}
                title="Are you sure?"
                subTitle="This action will remove this post permanently!"
                // busy
            />
        </>
    );
};

export default InfiniteScrollPosts;