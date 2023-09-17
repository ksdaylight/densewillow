'use client';

import { FC, useCallback, useEffect, useState } from 'react';

import { deleteCookie, getCookie } from 'cookies-next';

import { isNil } from 'lodash';

import { PostWithPartialRelations } from '@api-contracts';

import InfiniteScrollPosts from '@frontend/components/common/InfiniteScrollPosts';

import PaddingContainer from '@frontend/components/layout/padding-container';

import { apiClient, filterPosts } from '@frontend/utils/helps';

import { useRoleInfoContext } from '@frontend/context/role-info';

import DefaultLayout from '@frontend/components/layout/DefaultLayout';

interface Props {
    lng?: string;
}
const Home: FC<Props> = ({ lng }): JSX.Element => {
    const [postsToRender, setPostsToRender] = useState<PostWithPartialRelations[]>([]);
    const [hasMorePosts, setHasMorePosts] = useState(true);
    const limit = 9;
    const { userInfoLocal, setUserInfoLocal } = useRoleInfoContext();
    const { data: userProfileData, error } = apiClient.user.getUserProfile.useQuery(
        ['getUserProfile', '1'],
        {},
        {
            staleTime: Infinity,
            retry: 0, // 禁用自动重试
            refetchOnWindowFocus: false, // 禁用当窗口聚焦时的数据重获取
            refetchOnMount: false, // 禁用当组件重新挂载时的数据重获取
            // enabled: false,
        },
    );
    const { mutate: zodTestMutate } = apiClient.zodTest.getPostUniqueZod.useMutation({
        onSuccess(data, variables, context) {
            console.log(data);
        },
        onError(err, variables, context) {
            console.log(err);
        },
        onSettled(data) {
            console.log(data);
        },
    });

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
        console.log('postData---\n');
        zodTestMutate({
            body: {
                where: { slug: 'a-lovely-green-city' },
                // include: {
                //     thumbnail: true,
                //     translations: true,
                // },
            },
        });
        console.log('postData---end\n');
    }, []);
    useEffect(() => {
        if (isNil(error)) return;
        const httpStatusCode = error.status;
        if (httpStatusCode === 403 || httpStatusCode === 401) {
            setUserInfoLocal({
                id: undefined,
                name: undefined,
                avatar: undefined,
                role: 'guest',
            });
            deleteCookie('user_role');
        }
    }, [error]);
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
        </DefaultLayout>
    );
};

export default Home;
