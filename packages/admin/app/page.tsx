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
    // const res =
    await fetch(`http://127.0.0.1:3100/api/test`, {
        headers: {
            authorization: `bearer ${token?.value || ''}`, // Use your cookie
        },
    });

    // console.log(res);
    const userRole = cookieStore.get('user_role');

    return (
        <DefaultLayout
            isAdmin={userRole?.value === 'super-admin'}
            isAuth={userRole?.value !== undefined}
        >
            <div className="pb-20">
                <Home isAdmin={userRole?.value === 'super-admin'} />
            </div>
        </DefaultLayout>
    );
};
export default Index;
