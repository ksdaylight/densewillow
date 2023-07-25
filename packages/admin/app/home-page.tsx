'use client';

import { FC, useCallback, useEffect, useState } from 'react';

import InfiniteScrollPosts from '../components/common/InfiniteScrollPosts';
import { PostDetail } from '../utils/types';

import { formatPosts } from '../utils/helps';

import { apiClient } from './admin/page';

interface Props {}
const Home: FC<Props> = (): JSX.Element => {
    const [postsToRender, setPostsToRender] = useState<PostDetail[]>([]);
    const [hasMorePosts, setHasMorePosts] = useState(true);
    let pageNo = 0;
    const limit = 9;
    const isAdmin = false;

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

   if (data) {
       const posts = data.pages.flatMap((page) => (page.status === 200 ? page.body.posts : []));
   }
    return (
        <InfiniteScrollPosts
            hasMore={hasMorePosts}
            next={fetchMorePosts}
            dataLength={postsToRender.length}
            posts={postsToRender}
            showControls={isAdmin}
        />
    );
};

export default Home;
