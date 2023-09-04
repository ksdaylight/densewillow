import { FC, ReactNode, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { PostWithPartialRelations } from '@api-contracts';

import { apiClient } from '../../app/page';

import PostCard from './PostCard';
import ConfirmModal from './ConfirmModal';
import PostList from './post-lists';

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
    const chunkArray = (array: PostWithPartialRelations[], chunk_size: number) => {
        const results = [];

        for (let i = 0; i < array.length; i += chunk_size) {
            results.push(array.slice(i, i + chunk_size));
        }

        return results;
    };

    const postChunks = chunkArray(posts, 6);
    return (
        <>
            <InfiniteScroll
                hasMore={hasMore}
                next={next}
                dataLength={dataLength}
                loader={loader || defaultLoader}
            >
                <div>
                    {postChunks.map((chunk, chunkIndex) => {
                        return (
                            // eslint-disable-next-line react/no-array-index-key
                            <div key={chunkIndex} className="space-y-10">
                                {chunk.map((post, index) => {
                                    if (index === 0) {
                                        return (
                                            <PostCard
                                                post={post}
                                                key={post.slug}
                                                controls={showControls}
                                                onDeleteClick={() => handleOnDeleteClick(post)}
                                                busy={post.id === postToRemove?.id && removing}
                                            />
                                        );
                                    }

                                    if (index === 3) {
                                        return (
                                            <PostCard
                                                key={post.slug}
                                                post={post}
                                                controls={showControls}
                                                onDeleteClick={() => handleOnDeleteClick(post)}
                                                busy={post.id === postToRemove?.id && removing}
                                                reverse
                                            />
                                        );
                                    }

                                    if (index === 1 || index === 4) {
                                        const relevantPosts = chunk.slice(index, index + 2);
                                        return (
                                            <PostList
                                                key={`post-list-${relevantPosts[0].title}`}
                                                posts={relevantPosts}
                                                controls={showControls}
                                                onDeleteClick={handleOnDeleteClick}
                                                busy={removing}
                                                busyId={postToRemove?.id}
                                            />
                                        );
                                    }

                                    return null; // 需要一个返回值以满足 TypeScript
                                })}
                            </div>
                        );
                    })}
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
