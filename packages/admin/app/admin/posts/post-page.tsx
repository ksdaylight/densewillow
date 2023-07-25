'use client';

import { FC, useEffect, useState, useCallback } from 'react';

import { filterPosts, formatPosts } from '../../../utils/helps';

import { PostDetail } from '../../../utils/types';

import { apiClient } from '../page';

import InfiniteScrollPosts from '../../../components/common/InfiniteScrollPosts';

interface Props {}
const PostAdmin: FC<Props> = (): JSX.Element => {
    const [postsToRender, setPostsToRender] = useState<PostDetail[]>([]);
    const [hasMorePosts, setHasMorePosts] = useState(true);

    const limit = 9;
    const { data, isFetching, fetchNextPage, hasNextPage } =
        apiClient.content.getPosts.useInfiniteQuery(
            ['getPosts', '1'],
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
            const newPosts = data.pages.flatMap((page) => formatPosts(page.body.posts));
            setPostsToRender(newPosts);
            setHasMorePosts(hasNextPage ?? false);
        }
    }, [data, hasNextPage]);

    const fetchMorePosts = useCallback(() => {
        if (!isFetching && hasNextPage) {
            fetchNextPage();
        }
    }, [isFetching, fetchNextPage, hasNextPage]);

    // if (data) {
    //     const posts = data.pages.flatMap((page) => (page.status === 200 ? page.body.posts : []));
    // }
    return (
        <InfiniteScrollPosts
            hasMore={hasMorePosts}
            next={fetchMorePosts}
            dataLength={postsToRender.length}
            posts={postsToRender}
            showControls
            onPostRemoved={(post) => setPostsToRender(filterPosts(postsToRender, post))}
        />
    );
};

export default PostAdmin;
