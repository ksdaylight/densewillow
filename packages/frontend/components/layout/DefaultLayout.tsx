import { FC, ReactNode } from 'react';

import AppHead from '../common/AppHead';
import UserNav from '../common/nav/UserNav';

import PaddingContainer from './padding-container';

interface Props {
    title?: string;
    desc?: string;
    children?: ReactNode;
}

const DefaultLayout: FC<Props> = ({ children, title, desc }): JSX.Element => {
    return (
        <>
            <AppHead title={title} desc={desc} />
            <div className="min-h-screen bg-primary dark:bg-primary-dark transition">
                <div className="sticky top-0 z-[999] left-0 right-0 bg-white bg-opacity-50 border-b backdrop-blur-md">
                    <PaddingContainer>
                        <UserNav />
                    </PaddingContainer>
                </div>
                <div className="pt-10">{children}</div>
            </div>
        </>
    );
};

export default DefaultLayout;
