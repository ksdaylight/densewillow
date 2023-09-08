'use client';

import { useTranslation } from '@frontend/app/i18n/client';

import { usePathname } from 'next/navigation';
import { FC } from 'react';

import { fallbackLng } from '@frontend/app/i18n/settings';

import LngSwitcherBase from './LngSwitcherBase';

interface Props {
    lng?: string;
}
const LngSwitcherClient: FC<Props> = ({ lng = fallbackLng }) => {
    const { t } = useTranslation(lng, 'lng-switcher');
    const pathname = usePathname();
    return <LngSwitcherBase t={t} lng={lng} pathname={pathname} />;
};
export default LngSwitcherClient;
