import { FC } from 'react';

import { useTranslation } from '@frontend/app/i18n';

import LngSwitcherBase from './LngSwitcherBase';

interface Props {
    lng: string;
}
const LngSwitcherService: FC<Props> = async ({ lng }) => {
    const { t } = await useTranslation(lng, 'lng-switcher');
    return <LngSwitcherBase t={t} lng={lng} />;
};
export default LngSwitcherService;
