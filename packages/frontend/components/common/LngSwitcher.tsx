import React, { FC } from 'react';
import Link from 'next/link';
import { Trans } from 'react-i18next/TransWithoutContext';

import { useTranslation } from '@frontend/app/i18n';

import { languages } from '@frontend/app/i18n/settings';
import { TFunction } from 'i18next';

interface Props {
    lng: string;
}

const LngSwitcher: FC<Props> = async ({ lng }) => {
    const { t } = await useTranslation(lng);
    return (
        <footer style={{ marginTop: 50 }}>
            <Trans i18nKey="languageSwitcher" t={t as TFunction<'translation'>}>
                Switch from <strong>{lng}</strong> to:{' '}
            </Trans>
            {languages
                .filter((l) => lng !== l)
                .map((l, index) => (
                    <span key={l}>
                        {index > 0 && ' or '}
                        <Link href={`/${l}`}>{l}</Link>
                    </span>
                ))}
        </footer>
    );
};

export default LngSwitcher;
