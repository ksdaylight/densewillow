'use server';

import { cookies } from 'next/headers';

import { cookieName } from '@frontend/app/i18n/settings';

export async function checkI18nCookie(activeLanguage: string) {
    const cookieStore = cookies();
    const i18nCookie = cookieStore.get(cookieName);
    if (i18nCookie?.value !== activeLanguage) {
        cookieStore.set(cookieName, activeLanguage, { path: '/' });
    }
}
/**
     useEffect(() => {
        checkCookie(lng || 'en').then();
    }, []);

    work with LngSwitcherService
 */
