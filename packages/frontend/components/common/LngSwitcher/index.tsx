import { FC } from 'react';

import { useTranslation } from '@frontend/app/i18n';
import { headers } from 'next/headers';

import LngSwitcherBase from './LngSwitcherBase';

interface Props {
    lng: string;
}
const LngSwitcherService: FC<Props> = async ({ lng }) => {
    const { t } = await useTranslation(lng, 'lng-switcher');
    const headersList = headers();
    // const domain = headersList.get('x-forwarded-host') || '';
    // const protocol = headersList.get('x-forwarded-proto') || '';
    const pathname = headersList.get('x-invoke-path') || '';

    // await checkCookie(lng);
    // const handleOnClick = (targetLanguage: string) => {
    //     cookieStore.set(cookieName, targetLanguage, { path: '/' });
    // };
    // console.log(pathname);
    return (
        <>
            <LngSwitcherBase t={t} lng={lng} pathname={pathname} />
        </>
    );
};
export default LngSwitcherService;
