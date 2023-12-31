'use client';

import Link from 'next/link';

import { FC } from 'react';
import { HiLightBulb } from 'react-icons/hi';

// import { useRouter } from 'next/navigation';
import { useRouter } from 'next-nprogress-bar';
import { deleteCookie } from 'cookies-next';

import useDarkMode from '@frontend/hooks/useDarkMode';

import { useRoleInfoContext } from '@frontend/context/role-info';

import { apiClient } from '@frontend/utils/helps';

import { GitHubAuthButton } from '../../button';
import DropdownOptions, { DropDownOptions } from '../DropdownOptions';
import ProfileHead from '../ProfileHead';
import LngSwitcherClient from '../LngSwitcher/client';

interface Props {
    lng?: string;
}

const UserNav: FC<Props> = ({ lng }): JSX.Element => {
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
            <Link href={`/${lng}`} className="text-lg font-bold">
                DenseWillow
            </Link>

            <div className="flex items-center space-x-5 ">
                <LngSwitcherClient lng={lng} />
                <button
                    onClick={toggleTheme}
                    className="dark:text-secondary-gray text-secondary-light"
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
