import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';

import { isNil } from 'lodash';

import { fallbackLng, languages, cookieName } from './app/i18n/settings';

acceptLanguage.languages(languages);

/* MIDDLEWARE */
export default function middleware(req: NextRequest) {
    let lng: string | undefined | null;
    if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
    if (isNil(lng)) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
    if (isNil(lng)) lng = fallbackLng;

    // Redirect if lng in path is not supported
    if (
        !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
        !req.nextUrl.pathname.startsWith('/_next')
    ) {
        return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
    }

    if (req.headers.has('referer')) {
        const refererUrl = new URL(req.headers.get('referer')!);
        const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
        const response = NextResponse.next();
        if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
        return response;
    }

    return NextResponse.next();
}

/* MATCHER */
export const config = {
    // matcher: '/:lng*'
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};
