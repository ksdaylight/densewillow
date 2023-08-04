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
    // const { data, refetch } = apiClient.user.githubAuthQuest.useQuery(
    //     ['userAuth', '1'],
    //     {},
    //     {
    //         enabled: false,
    //     },
    // );
    // const { data: data2, refetch: TestRe } = apiClient.content.testGet.useQuery(
    //     ['userAuth2', '1'],
    //     {},
    //     {
    //         enabled: false,
    //     },
    // );
    const handleClick = async () => {
        window.location.href = 'http://192.168.80.6/api/auth/github'; // TODO 需要改
        // await refetch();
        // if (data?.status === 200) {
        //     console.log(data?.body.message);
        // }
        // await TestRe();
        // if (data2?.status === 200) {
        //     console.log(data2?.body);
        // }
    };

    return (
        <button onClick={handleClick} className={classNames(commonClasses, getStyle())}>
            <span>Continue with</span>
            <AiFillGithub size={24} />
        </button>
    );
};
