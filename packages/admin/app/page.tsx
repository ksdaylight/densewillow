import { NextPage } from 'next';

import { cookies } from 'next/headers';

import DefaultLayout from '../components/layout/DefaultLayout';

import Home from './home-page';

interface Props {}

const Index: NextPage<Props> = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token');
    console.log(cookieStore.getAll());
    console.log(token);

    const userRole = cookieStore.get('user_role');

    console.log(userRole);
    return (
        <DefaultLayout>
            <div className="pb-20">
                <Home isAdmin={userRole?.value === 'super-admin'} />
            </div>
        </DefaultLayout>
    );
};
export default Index;
