'use client';

import { FC, useEffect, useState } from 'react';

import { isNil } from 'lodash';

// import { LatestUserProfile } from '@frontend/utils/types';

import { User } from '@api-contracts';

import PageNavigator from '@frontend/components/common/PageNavigator';

import LatesUserTable from '@frontend/components/admin/LatesUserTable';
import { apiClient } from '@frontend/utils/helps';

interface Props {}
const limit = 5;
const AdminUser: FC<Props> = (): JSX.Element => {
    const [users, setUsers] = useState<User[]>();

    const {
        data: allUsersData,
        // isFetching,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
    } = apiClient.user.getUsers.useInfiniteQuery(
        ['getUsers', '1'],
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

    const handleOnNextClick = () => {
        if (hasNextPage) fetchNextPage();
    };

    const handleOnPrevClick = () => {
        if (hasPreviousPage) fetchPreviousPage();
    };

    useEffect(() => {
        const userResult = allUsersData?.pages;
        if (!isNil(userResult)) {
            // const transformUser = userResult.flatMap((page) => {
            //     return page.body.users.map(
            //         (item: any): LatestUserProfile => ({
            //             id: item.i,
            //             name: item.name,
            //             avatar: item.avatar,
            //             provider: item.provider,
            //             email: item.email,
            //         }),
            //     );
            // });
            setUsers(userResult.flatMap((page) => page.body.users));
        }
    }, [allUsersData]);

    return (
        <>
            <h1 className="text-2xl dark:text-primary text-primary-dark font-semibold py-2 transition">
                Users
            </h1>
            <LatesUserTable users={users} />
            <div className="py-10 flex justify-end">
                <PageNavigator onNextClick={handleOnNextClick} onPrevClick={handleOnPrevClick} />
            </div>
        </>
    );
};
export default AdminUser;
