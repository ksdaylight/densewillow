import Providers from '@frontend/utils/provider';
import { dir } from 'i18next';
import { UserRoleContextProvider } from '@frontend/context/role-info';

import { useTranslation } from '../i18n';
import { languages } from '../i18n/settings';

import './global.css';

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
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
            languages: {
                'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
                'zh-CN': `${process.env.NEXT_PUBLIC_SITE_URL}/cn`,
            },
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
        <html lang={lng} dir={dir(lng)}>
            <body>
                <Providers>
                    <UserRoleContextProvider>{children}</UserRoleContextProvider>
                </Providers>
            </body>
        </html>
    );
};

export default RootLayout;
