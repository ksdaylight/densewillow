'use client';

import { FC, useEffect, useState, useCallback } from 'react';

import { PostWithPartialRelations } from '@api-contracts';

import InfiniteScrollPosts from '@frontend/components/common/InfiniteScrollPosts';

import { apiClient, filterPosts } from '@frontend/utils/helps';
import PaddingContainer from '@frontend/components/layout/padding-container';

interface Props {}
const PostAdmin: FC<Props> = (): JSX.Element => {
    const [postsToRender, setPostsToRender] = useState<PostWithPartialRelations[]>([]);
    const [hasMorePosts, setHasMorePosts] = useState(true);

    const limit = 9;
    const { data, isFetching, fetchNextPage, hasNextPage } =
        apiClient.content.getPosts.useInfiniteQuery(
            ['getPosts', '2'],
            ({ pageParam = { skip: 0, take: limit } }) => ({
                query: { skip: pageParam.skip, take: pageParam.take },
            }),
            {
                staleTime: 60000,
                getNextPageParam: (lastPage, allPages) => {
                    if (lastPage.status === 200) {
                        if (lastPage.body.count > allPages.length * limit) {
                            return { take: limit, skip: allPages.length * limit };
                        }
                        return undefined;
                    }
                    return undefined;
                },
            },
        );

    useEffect(() => {
        if (data?.pages) {
            const newPosts = data.pages.flatMap((page) => page.body.posts);
            setPostsToRender(newPosts);
            setHasMorePosts(hasNextPage ?? false);
        }
    }, [data, hasNextPage]);

    const fetchMorePosts = useCallback(() => {
        if (!isFetching && hasNextPage) {
            fetchNextPage();
        }
    }, [isFetching, fetchNextPage, hasNextPage]);
    return (
        <PaddingContainer className="pt-6">
            <InfiniteScrollPosts
                hasMore={hasMorePosts}
                next={fetchMorePosts}
                dataLength={postsToRender.length}
                posts={postsToRender}
                showControls
                onPostRemoved={(post) => setPostsToRender(filterPosts(postsToRender, post))}
            />
        </PaddingContainer>
    );
};

export default PostAdmin;
