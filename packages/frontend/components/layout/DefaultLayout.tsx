import { FC, ReactNode } from 'react';

import UserNav from '../common/nav/UserNav';

import PaddingContainer from './padding-container';

interface Props {
    title?: string;
    desc?: string;
    children?: ReactNode;
    lng?: string;
}

const DefaultLayout: FC<Props> = ({ children, title, desc, lng }): JSX.Element => {
    return (
        <>
            <div className="min-h-screen bg-primary dark:bg-primary-dark transition">
                <div className="sticky top-0 z-[999] left-0 right-0 bg-white bg-opacity-50 border-b backdrop-blur-md">
                    <PaddingContainer>
                        <UserNav lng={lng} />
                    </PaddingContainer>
                </div>
                <div className="pt-10 min-h-[calc(100vh-300px)]">{children}</div>
            </div>
        </>
    );
};

export default DefaultLayout;
