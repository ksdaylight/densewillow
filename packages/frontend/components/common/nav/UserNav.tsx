'use client';

import Link from 'next/link';

import { FC } from 'react';
import { HiLightBulb } from 'react-icons/hi';

import { useRouter } from 'next/navigation';

import { deleteCookie } from 'cookies-next';

import useDarkMode from '@frontend/hooks/useDarkMode';

import { useRoleInfoContext } from '@frontend/context/role-info';

import { apiClient } from '@frontend/utils/helps';

import { GitHubAuthButton } from '../../button';
import { APP_NAME } from '../AppHead';
import DropdownOptions, { DropDownOptions } from '../DropdownOptions';
import Logo from '../Logo';
import ProfileHead from '../ProfileHead';

interface Props {}

const UserNav: FC<Props> = (): JSX.Element => {
    const { toggleTheme } = useDarkMode();
    const { userInfoLocal, setUserInfoLocal } = useRoleInfoContext();
    const router = useRouter();
    const { mutate: logOutMutate } = apiClient.user.logout.useMutation();
    const logOutOption = {
        label: 'Logout',
        async onClick() {
            setUserInfoLocal({
                id: undefined,
                name: undefined,
                avatar: undefined,
                role: 'guest',
            });
            deleteCookie('user_role');
            logOutMutate({ body: 'logout' }); // teRest 有问题，必须放在最后
            router.push('/');
        },
    };
    const dropDownOptions: DropDownOptions =
        userInfoLocal.role === 'super-admin'
            ? [
                  {
                      label: 'Dashboard',
                      onClick() {
                          router.push('/admin');
                      },
                  },
                  logOutOption,
              ]
            : [logOutOption];

    return (
        <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex  items-center space-x-2 text-highlight-dark">
                <Logo className="fill-highlight-light md:w-7 md:h-7 w-4 h-4" />
                <span className="md:text-xl font-semibold color-highlight-light">{APP_NAME}</span>
            </Link>

            <div className="flex items-center space-x-5 ">
                <button
                    onClick={toggleTheme}
                    className="dark:text-secondary-dark text-secondary-light"
                >
                    <HiLightBulb size={30} />
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
