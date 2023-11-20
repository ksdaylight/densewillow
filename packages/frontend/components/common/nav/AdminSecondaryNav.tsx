'use client';

// import { signOut } from 'next-auth/react';
import { useRouter } from 'next-nprogress-bar';
import { FC } from 'react';

import useDarkMode from '@frontend/hooks/useDarkMode';

import { useRoleInfoContext } from '@frontend/context/role-info';

import DropdownOptions, { DropDownOptions } from '../DropdownOptions';
import ProfileHead from '../ProfileHead';
import SearchBar from '../SearchBar';

interface Props {}

const AdminSecondaryNav: FC<Props> = (): JSX.Element => {
    const router = useRouter();
    const { toggleTheme } = useDarkMode();
    const navigateToCreateNewPost = () => router.push('/admin/posts/create');
    // const handleLogOut = async () => signOut();
    const { userInfoLocal } = useRoleInfoContext();

    const options: DropDownOptions = [
        {
            label: 'Add new post',
            onClick: navigateToCreateNewPost,
        },
        {
            label: 'Change theme',
            onClick: toggleTheme,
        },
        // {
        //     label: 'Log out',
        //     // onClick: handleLogOut,
        // },
    ];

    return (
        <div className="flex items-center justify-between">
            {/* search bar */}
            <SearchBar />
            {/* options / profile head */}
            <DropdownOptions
                head={<ProfileHead nameInitial={userInfoLocal?.name?.toUpperCase() || 'M'} />}
                options={options}
            />
        </div>
    );
};

export default AdminSecondaryNav;
