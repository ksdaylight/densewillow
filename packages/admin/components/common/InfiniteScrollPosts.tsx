import { FC, ReactNode, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { apiClient } from '../../app/admin/page';
// 'packages/admin/app/admin/page';

import { PostDetail } from '../../utils/types';

import PostCard from './PostCard';
import ConfirmModal from './ConfirmModal';

interface Props {
    posts: PostDetail[];
    showControls?: boolean;
    hasMore: boolean;
    next(): void;
    dataLength: number;
    loader?: ReactNode;
    onPostRemoved(post: PostDetail): void;
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
    const [postToRemove, setPostToRemove] = useState<PostDetail | null>(null);

    const handleOnDeleteClick = (post: PostDetail) => {
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
                    <div className="grid grid-cols-3 gap-4">
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
