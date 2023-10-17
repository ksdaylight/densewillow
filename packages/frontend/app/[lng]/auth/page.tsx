import { NextPage } from 'next';

import { GitHubAuthButton } from '@frontend/components/button';

interface Props {}

const SignInPage: NextPage<Props> = () => {
    return (
        <div className="h-screen flex items-center justify-center bg-white dark:bg-primary-dark">
            <GitHubAuthButton lightOnly />
        </div>
    );
};

export default SignInPage;
