import { NextPage } from 'next';
// import { cookies } from 'next/headers';
import { initQueryClient } from '@ts-rest/react-query';

import { apiBlog } from '@api-contracts';

import DefaultLayout from '../../components/layout/DefaultLayout';

import Home from './home-page';

const headers = import('next/headers');

interface Props {}
export const baseApiUrl = `${process.env.SERVER_BASE_URL}/${process.env.APP_PREFIX}`;
export const apiClient = initQueryClient(apiBlog, {
    baseUrl: `${process.env.SERVER_BASE_URL}`,
    baseHeaders: {
        Authorization: 'key',
    }, // 类型需要匹配
    credentials: 'include',
});

const Index: NextPage<Props> = async () => {
    const cookieStore = (await headers).cookies();
    const token = cookieStore.get('auth_token');
    // console.log(cookieStore.getAll());
    // console.log(token);
    await fetch(`http://127.0.0.1:3100/api/test`, {
        headers: {
            authorization: `bearer ${token?.value || ''}`,
        },
    });

    // const userRole = cookieStore.get('user_role');

    return (
        <DefaultLayout>
            <div className="pt-10">
                <Home />
            </div>
        </DefaultLayout>
    );
};
export default Index;
