import { NextPage } from 'next';
import { cookies } from 'next/headers';

// import LngSwitcherService from '@frontend/components/common/LngSwitcher';

// import { checkCookie } from '@frontend/actions/i18n-actions';

// import { useTranslation } from '../i18n';

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
    // const { t } = await useTranslation(params.lng);
    const cookieStore = cookies();
    // console.log(cookieStore);
    // const cookieStore = (await headers).cookies();
    const token = cookieStore.get('auth_token');
    // console.log(cookieStore.getAll());
    console.log(token);
    await fetch(`http://127.0.0.1:3100/api/test`, {
        headers: {
            authorization: `bearer ${token?.value || ''}`,
        },
    });

    return (
        <>
            {/* <h1>{t('title')}</h1>
            <LngSwitcherService lng={params.lng} /> */}
            <Home />
        </>
    );
};
export default Index;
