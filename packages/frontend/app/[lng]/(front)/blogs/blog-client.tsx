'use client';

import { PortfolioSidebar } from '@frontend/components/common/PortfolioSidebar';
import Image from 'next/image';
import InfiniteScrollPosts from '@frontend/components/common/InfiniteScrollPosts';
import { FC, useCallback, useEffect, useState } from 'react';

import { deleteCookie, getCookie } from 'cookies-next';

import { isNil } from 'lodash';

import { PostWithPartialRelations } from '@api-contracts';

import { apiClient, filterPosts } from '@frontend/utils/helps';

import { useRoleInfoContext } from '@frontend/context/role-info';
import PaddingContainer from '@frontend/components/layout/padding-container';

interface Props {}
const MyBlogsClient: FC<Props> = (): JSX.Element => {
    const [postsToRender, setPostsToRender] = useState<PostWithPartialRelations[]>([]);
    const [hasMorePosts, setHasMorePosts] = useState(true);
    const limit = 9;
    const { setUserInfoLocal } = useRoleInfoContext();
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
    return (
        <>
            <PortfolioSidebar activeItem="/blogs" />
            <main className="pl-0 pt-[50px] md:pl-[102px] md:pt-0 ">
                <section
                    id="blogs"
                    className={`block pt-[64px] bg-none md:bg-[url('/images/bg-shape-light.png')] md:dark:bg-[url('/images/bg-shape.png')] bg-no-repeat bg-[60vw_374px] min-h-screen`}
                >
                    <div className="text-center">
                        <header className="header-has-bg mb-20">
                            <Image
                                src="/images/h1-bg-light.png"
                                alt="h1 bg"
                                width={166}
                                height={75}
                                className="dark:hidden"
                            />
                            <Image
                                src="/images/h1-bg.png"
                                alt="h1 bg"
                                width={166}
                                height={75}
                                className="hidden dark:block"
                            />
                            <h1>My Blog</h1>
                        </header>
                    </div>
                    {/* <div className="sticky top-0 z-[999] left-0 right-0 bg-white bg-opacity-50 border-b backdrop-blur-md">
                        <UserNav />
                    </div> */}
                    <PaddingContainer>
                        <InfiniteScrollPosts
                            hasMore={hasMorePosts}
                            next={fetchMorePosts}
                            dataLength={postsToRender.length}
                            posts={postsToRender}
                            // showControls={userInfoLocal.role === 'super-admin'}
                            onPostRemoved={(post) =>
                                setPostsToRender(filterPosts(postsToRender, post))
                            }
                        />
                    </PaddingContainer>
                </section>
            </main>
        </>
    );
};

export default MyBlogsClient;
