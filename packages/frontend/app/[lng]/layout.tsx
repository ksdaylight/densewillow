import Providers from '@frontend/utils/provider';
import { dir } from 'i18next';
import { Playfair_Display, Ubuntu } from '@next/font/google';
import { UserRoleContextProvider } from '@frontend/context/role-info';

import Script from 'next/script';

import { useTranslation } from '../i18n';
import { languages } from '../i18n/settings';

import './global.css';

const playfairDisplay = Playfair_Display({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-playfair-display',
});
const ubuntu = Ubuntu({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-ubuntu',
    weight: ['300', '400', '500', '700'],
});
interface StaticParams {
    lng: string;
}
export async function generateStaticParams(): Promise<StaticParams[]> {
    return languages.map((lng: string) => ({ lng }));
}
export const generateMetadata = async ({ params: { lng } }: { params: { lng: string } }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = await useTranslation(lng);
    return {
        title: {
            template: `%s | DenseWillow`,
            default: 'DenseWillow',
        },
        description: t('description'),
        openGraph: {
            title: 'DenseWillow',
            description: t('description'),
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lng}`,
            siteName: 'DenseWillow',
            images: [
                {
                    url: `${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image.jpg`,
                    width: 1200,
                    height: 628,
                },
            ],
            locale: lng,
            type: 'website',
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
            languages: {
                'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
                'zh-CN': `${process.env.NEXT_PUBLIC_SITE_URL}/cn`,
            },
        },
        /* Verification for Google Search Console */
        verification: {
            google: 'l8LGPf1g5I9sw3fXTBWgVoioruy7EFH8Z1kfJf_W_4A',
        },
    };
};
interface RootLayoutProps {
    children: React.ReactNode;
    params: {
        lng: string;
    };
}
const RootLayout = async ({ children, params: { lng } }: RootLayoutProps) => {
    return (
        <html
            lang={lng}
            dir={dir(lng)}
            className={`${playfairDisplay.variable} ${ubuntu.variable} dark`}
        >
            <Script
                strategy="lazyOnload"
                // strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=G-FK5NCXNE8L"
            />
            <Script
                strategy="lazyOnload"
                id="google-analytics"
            >{`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-FK5NCXNE8L');`}</Script>
            <body>
                <Providers>
                    <UserRoleContextProvider>{children}</UserRoleContextProvider>
                </Providers>
            </body>
        </html>
    );
};

export default RootLayout;
