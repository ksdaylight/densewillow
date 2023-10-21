import React, { FC } from 'react';
import Link from 'next/link';
import { Trans } from 'react-i18next/TransWithoutContext';

import { languages } from '@frontend/app/i18n/settings';
import { TFunction } from 'i18next';
// import { usePathname } from 'next/navigation';

interface Props {
    lng: string;
    t: (key: string) => string;
    pathname?: string;
}

const LngSwitcherBase: FC<Props> = ({ t, lng, pathname }) => {
    const redirectTarget = (targetLanguage: string) => {
        if (!pathname) return '/';
        const segments = pathname.split('/');
        segments[1] = targetLanguage;
        return segments.join('/');
    };
    return (
        <div className="flex items-center gap-1 font-semibold flex-col">
            {languages
                .filter((l) => lng !== l)
                .map((l, index) => (
                    <span key={l}>
                        {index > 0 && ' or '}
                        <Link href={redirectTarget(l)}>{l.toUpperCase()}</Link>
                    </span>
                ))}
            <Trans
                i18nKey="languageSwitcher"
                t={t as TFunction<'translation'>}
                // values={{ lng }}
                components={{ 1: <span className="font-thin text-xs" /> }} // "languageSwitcher": "从<1>{{lng}}</1> 切换到: "
            >
                {/* {` Switch from <strong>{{ lng }}</strong> to: `} */}
                {`<span>lng</span>`}
            </Trans>
        </div>
    );
};

export default LngSwitcherBase;
