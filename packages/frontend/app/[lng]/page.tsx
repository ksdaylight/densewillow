import { NextPage } from 'next';
import { cookies } from 'next/headers';

import LngSwitcher from '@frontend/components/common/LngSwitcher';

import Link from 'next/link';

import { useTranslation } from '../i18n';

import Home from './home-page';

// import Home from './home-page';

// const headers = import('next/headers');
// export const dynamic = 'force-static';

interface Props {
    params: {
        lng: string;
    };
}

const Index: NextPage<Props> = async ({ params }) => {
    const { t } = await useTranslation(params.lng);
    const cookieStore = cookies();
    console.log(cookieStore);
    // const cookieStore = (await headers).cookies();
    const token = cookieStore.get('auth_token');
    // console.log(cookieStore.getAll());
    console.log(token);
    await fetch(`http://127.0.0.1:3100/api/test`, {
        headers: {
            authorization: `bearer ${token?.value || ''}`,
        },
    });

    // const userRole = cookieStore.get('user_role');
    // const fetchTest = async () => {
    //     'use server';

    //     try {
    //         const cookieStore = (await headers).cookies();
    //         const token = cookieStore.get('auth_token');
    //         // console.log(cookieStore.getAll());
    //         console.log(token);
    //         await fetch(`http://127.0.0.1:3100/api/test`, {
    //             headers: {
    //                 authorization: `bearer ${token?.value || ''}`,
    //             },
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // await fetchTest();
    return (
        <>
            <h1>{t('title')}</h1>
            <Link href="/en">to en-------</Link>
            <Link href="/cn">to cn-------</Link>
            <LngSwitcher lng={params.lng} />
            <Home />
        </>
    );
};
export default Index;