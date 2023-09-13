'use client';

import { FC, useCallback } from 'react';
import classNames from 'classnames';
import { AiFillGithub } from 'react-icons/ai';

interface Props {
    lightOnly?: boolean;
}

const commonClasses =
    'flex items-center justify-center space-x-1 px-3 py-2 rounded hover:scale-[0.97] transition duration-100';

export const GitHubAuthButton: FC<Props> = ({ lightOnly }): JSX.Element => {
    const getStyle = useCallback(() => {
        if (lightOnly) return 'text-primary-dark bg-primary';
        return 'bg-primary-dark dark:bg-primary dark:text-primary-dark text-primary';
    }, [lightOnly]);
    const handleClick = async () => {
        window.location.href = `${process.env.SERVER_PUBLIC_URL}/api/auth/github`;
    };

    return (
        <button onClick={handleClick} className={classNames(commonClasses, getStyle())}>
            <span>Continue with</span>
            <AiFillGithub size={24} />
        </button>
    );
};
