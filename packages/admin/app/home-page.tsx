'use client';

import { FC, useState } from 'react';

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

    const fetchMorePosts = async () => {
        try {
            pageNo++;
            const { data } = apiClient.content.getPosts.useQuery(
                ['getPosts', '1'],
                {
                    query: {
                        skip: String(pageNo * limit),
                        take: String(limit),
                    },
                },
                {
                    enabled: false,
                },
            );

            // const { data } = await axios(`/api/posts?limit=${limit}&pageNo=${pageNo}`);
            if (data) {
                if (data.body.posts.length < limit) {
                    setPostsToRender([...postsToRender, ...formatPosts(data.body.posts)]);
                    setHasMorePosts(false);
                } else {
                    setPostsToRender([...postsToRender, ...formatPosts(data.body.posts)]);
                }
            }
        } catch (error) {
            setHasMorePosts(false);
            console.log(error);
        }
    };
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
