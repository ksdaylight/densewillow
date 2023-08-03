'use client';

import { FC, useCallback, useEffect, useState } from 'react';

// import { getCookies } from 'cookies-next';

import { PostDetail } from '../utils/types';

import { filterPosts, formatPosts } from '../utils/helps';

import InfiniteScrollPosts from '../components/common/InfiniteScrollPosts';

import { apiClient } from './page'; // './page';

interface Props {
    isAdmin?: boolean;
}
const Home: FC<Props> = ({ isAdmin = false }): JSX.Element => {
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
                staleTime: 600000,
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

    const { data: testData } = apiClient.content.testGet.useQuery(
        ['userAuth2', '1'],
        {},
        {
            staleTime: 18000,
        },
    );
    console.log(testData);

    // const cookieStore = getCookies();

    // console.log(cookieStore);
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

    return (
        <InfiniteScrollPosts
            hasMore={hasMorePosts}
            next={fetchMorePosts}
            dataLength={postsToRender.length}
            posts={postsToRender}
            showControls={isAdmin}
            onPostRemoved={(post) => setPostsToRender(filterPosts(postsToRender, post))}
        />
    );
};

export default Home;
