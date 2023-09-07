'use client';

import { useEffect, useState } from 'react';
import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';

import { getCookie, setCookie } from 'cookies-next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import { getOptions, languages, cookieName, fallbackLng } from './settings';

const runsOnServerSide = typeof window === 'undefined';

// 初始化 i18next
i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(
        resourcesToBackend(
            (language: string, namespace: string) =>
                import(`./locales/${language}/${namespace}.json`),
        ),
    )
    .init({
        ...getOptions(),
        lng: undefined, // 让客户端侦测语言
        detection: {
            order: ['path', 'htmlTag', 'cookie', 'navigator'],
        },
        preload: runsOnServerSide ? languages : [],
    });

export function useTranslation(lng: string = fallbackLng, ns?: string | string[], options?: any) {
    // const [cookies, setCookie] = useCookies([cookieName]);

    const i18nCookie = getCookie(cookieName);
    const ret = useTranslationOrg(ns, options);
    const { i18n } = ret;

    if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
        i18n.changeLanguage(lng);
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [activeLng, setActiveLng] = useState<string | undefined>(i18n.resolvedLanguage);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (activeLng === i18n.resolvedLanguage) return;
            setActiveLng(i18n.resolvedLanguage);
        }, [activeLng, i18n.resolvedLanguage]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (!lng || i18n.resolvedLanguage === lng) return;
            i18n.changeLanguage(lng);
        }, [lng, i18n]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            if (i18nCookie === lng) return;
            setCookie(cookieName, lng, { path: '/' });
        }, [lng, i18nCookie]);
    }

    return ret;
}
