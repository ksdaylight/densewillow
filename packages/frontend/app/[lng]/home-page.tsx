'use client';

import { FC, useCallback, useEffect, useState } from 'react';

import { getCookie } from 'cookies-next';

import { isNil } from 'lodash';

import { PostWithPartialRelations } from '@api-contracts';

import InfiniteScrollPosts from '@frontend/components/common/InfiniteScrollPosts';

import PaddingContainer from '@frontend/components/layout/padding-container';

import { apiClient, filterPosts } from '@frontend/utils/helps';

import { useRoleInfoContext } from '@frontend/context/role-info';

import DefaultLayout from '@frontend/components/layout/DefaultLayout';
import { checkI18nCookie } from '@frontend/actions/i18n-actions';

interface Props {
    lng?: string;
}
const Home: FC<Props> = ({ lng }): JSX.Element => {
    const [postsToRender, setPostsToRender] = useState<PostWithPartialRelations[]>([]);
    const [hasMorePosts, setHasMorePosts] = useState(true);
    const limit = 9;
    const { userInfoLocal, setUserInfoLocal } = useRoleInfoContext();
    const { data: userProfileData } = apiClient.user.getUserProfile.useQuery(
        ['getUserProfile', '1'],
        {},
        {
            staleTime: 60000,
        },
    );
    const userProfile = userProfileData?.body;
    const roleInfo = getCookie('user_role');
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

    useEffect(() => {
        if (isNil(userProfile)) return;
        setUserInfoLocal({
            id: userProfile.id,
            name: userProfile.name,
            avatar: userProfile.avatar || undefined,
            role: roleInfo as string,
        });
    }, [userProfile]);

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
    // useEffect(() => {
    //     checkI18nCookie(lng || 'en').then();
    // }, []);
    return (
        <DefaultLayout lng={lng}>
            <div className="pt-10">
                <PaddingContainer>
                    <InfiniteScrollPosts
                        hasMore={hasMorePosts}
                        next={fetchMorePosts}
                        dataLength={postsToRender.length}
                        posts={postsToRender}
                        showControls={userInfoLocal.role === 'super-admin'}
                        onPostRemoved={(post) => setPostsToRender(filterPosts(postsToRender, post))}
                    />
                </PaddingContainer>
            </div>
        </DefaultLayout>
    );
};

export default Home;
