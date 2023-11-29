'use client';

import { fallbackLng } from '@frontend/app/i18n/settings';
import { FC, useEffect, useRef } from 'react';
import Typed from 'typed.js';

interface Props {
    initialText: string;
    typedStrings: string[];
    lng: string;
    className?: string;
}
export const TypedH2: FC<Props> = ({
    initialText,
    className,
    typedStrings,
    lng = fallbackLng,
}): JSX.Element => {
    const typedEl = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const typed = new Typed(typedEl.current, {
            strings: typedStrings, // ['Front-End web developer', 'Back-End web developer', 'Web designer'],
            loop: true,
            typeSpeed: lng === 'en' ? 70 : 150,
            backSpeed: 10,
        });

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, []);
    return (
        <h2 ref={typedEl} className={`${className}`}>
            {initialText}
        </h2>
    );
};
