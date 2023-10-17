'use client';

import { FC, useCallback } from 'react';
import classNames from 'classnames';
import { AiFillGithub } from 'react-icons/ai';

interface Props {
    lightOnly?: boolean;
}

const commonClasses = 'btn-custom-base';

export const GitHubAuthButton: FC<Props> = ({ lightOnly }): JSX.Element => {
    const getStyle = useCallback(() => {
        if (lightOnly) return 'bg-[#E9EFFF] dark:bg-[#262f48] text-primary';
        return 'bg-secondary_gray_light dark:bg-secondary-dark text-paragraph_light dark:text-primary';
    }, [lightOnly]);
    const handleClick = async () => {
        window.location.href = `${process.env.SERVER_PUBLIC_URL}/api/auth/github`;
    };

    return (
        <button onClick={handleClick} className={classNames(commonClasses, getStyle())}>
            <div className="flex items-center justify-center space-x-1">
                <span>Continue with</span>
                <AiFillGithub size={24} />
            </div>
        </button>
    );
};
