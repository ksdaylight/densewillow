'use client';

import Link from 'next/link';

import { FC } from 'react';
import { HiLightBulb } from 'react-icons/hi';

import { useRouter } from 'next/navigation';

import useDarkMode from '../../../hooks/useDarkMode';

import { GitHubAuthButton } from '../../button';
import { APP_NAME } from '../AppHead';
import DropdownOptions, { DropDownOptions } from '../DropdownOptions';
import Logo from '../Logo';
import ProfileHead from '../ProfileHead';
import { useRoleInfoContext } from '../../../context/role-info';

interface Props {}

const defaultOptions: DropDownOptions = [
    {
        label: 'Logout',
        async onClick() {
            // await signOut();
        }, // TODO
    },
];

const UserNav: FC<Props> = (): JSX.Element => {
    const { toggleTheme } = useDarkMode();
    const { userInfoLocal } = useRoleInfoContext();
    const router = useRouter();
    const dropDownOptions: DropDownOptions =
        userInfoLocal.role === 'super-admin'
            ? [
                  {
                      label: 'Dashboard',
                      onClick() {
                          router.push('/admin');
                      },
                  },
                  ...defaultOptions,
              ]
            : defaultOptions;

    return (
        <div className="flex items-center justify-between bg-primary-dark p-3">
            {/* Logo */}
            <Link href="/" className="flex  items-center space-x-2 text-highlight-dark">
                <Logo className="fill-highlight-dark  md:w-8 md:h-8 w-5 h-5" />
                <span className="md:text-xl font-semibold">{APP_NAME}</span>
            </Link>

            <div className="flex items-center space-x-5">
                <button
                    onClick={toggleTheme}
                    className="dark:text-secondary-dark text-secondary-light"
                >
                    <HiLightBulb size={34} />
                </button>

                {userInfoLocal.role !== 'guest' ? (
                    <DropdownOptions
                        options={dropDownOptions}
                        head={
                            <ProfileHead
                                nameInitial={userInfoLocal?.name?.toUpperCase()}
                                avatar={userInfoLocal.avatar}
                                lightOnly
                            />
                        }
                    />
                ) : (
                    <GitHubAuthButton lightOnly />
                )}
            </div>
        </div>
    );
};

export default UserNav;
