import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FC } from 'react';
import { HiLightBulb } from 'react-icons/hi';

import { useRouter } from 'next/router';

import { GitHubAuthButton } from '../../button';
import { APP_NAME } from '../AppHead';
import DropdownOptions, { DropDownOptions } from '../DropdownOptions';
import Logo from '../Logo';
import ProfileHead from '../ProfileHead';
import { UserProfile } from '../../../utils/types';

interface Props {}

const defaultOptions: DropDownOptions = [
    {
        label: 'Logout',
        async onClick() {
            await signOut();
        },
    },
];

const UserNav: FC<Props> = (props): JSX.Element => {
    const router = useRouter();
    const { data, status } = useSession();
    const isAuth = status === 'authenticated';
    const profile = data?.user as UserProfile | undefined;
    const isAdmin = profile && profile.role === 'admin';

    const handleLoginWithGithub = async () => {
        await signIn('github');
    };

    const dropDownOptions: DropDownOptions = isAdmin
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
            <Link href="/">
                <a className="flex space-x-2 text-highlight-dark">
                    <Logo className="fill-highlight-dark" />
                    <span className="text-xl font-semibold">{APP_NAME}</span>
                </a>
            </Link>

            <div className="flex items-center space-x-5">
                <button className="dark:text-secondary-dark text-secondary-light">
                    <HiLightBulb size={34} />
                </button>

                {isAuth ? (
                    <DropdownOptions
                        options={dropDownOptions}
                        head={<ProfileHead nameInitial="N" lightOnly />}
                    />
                ) : (
                    <GitHubAuthButton onClick={handleLoginWithGithub} lightOnly />
                )}
            </div>
        </div>
    );
};

export default UserNav;