import { NextPage } from 'next';

import { GitHubAuthButton } from '../../components/button';

interface Props {}

const Signin: NextPage<Props> = () => {
    return (
        <div className="h-screen flex items-center justify-center bg-primary dark:bg-primary-dark">
            <GitHubAuthButton />
        </div>
    );
};

export default Signin;
