import { FC, ReactNode } from 'react';

import AppHead from '../common/AppHead';
import UserNav from '../common/nav/UserNav';

interface Props {
    title?: string;
    desc?: string;
    children?: ReactNode;
    isAuth?: boolean;
    isAdmin?: boolean;
}

const DefaultLayout: FC<Props> = ({
    children,
    title,
    desc,
    isAdmin = false,
    isAuth = false,
}): JSX.Element => {
    return (
        <>
            <AppHead title={title} desc={desc} />
            <div className="min-h-screen bg-primary dark:bg-primary-dark transition">
                <UserNav isAdmin={isAdmin} isAuth={isAuth} />

                <div className="max-w-4xl mx-auto">{children}</div>
            </div>
        </>
    );
};

export default DefaultLayout;
