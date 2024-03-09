/* eslint-disable react/no-array-index-key */
import { m } from 'framer-motion';
import { repeat } from 'ramda';
import { useMemo } from 'react';

import Cover3 from '@slash-admin/src/assets/images/cover/cover_3.jpg';
import MotionContainer from '@slash-admin/src/components/animate/motion-container';
import { getVariant } from '@slash-admin/src/components/animate/variants';
import { useThemeToken } from '@slash-admin/src/theme/hooks';

const TEXT = 'SlashAdmin';
type Props = {
    isText: boolean;
    isMulti: boolean;
    variant: string;
};
export default function ContainerView({ isText, variant, isMulti }: Props) {
    const { colorBgLayout } = useThemeToken();
    const varients = useMemo(() => getVariant(variant), [variant]);
    const imgs = useMemo(() => (isMulti ? repeat(Cover3, 5) : [Cover3]), [isMulti]);

    return (
        <div
            key={variant}
            className="xs:p-20 overflow-auto rounded-lg"
            style={{ backgroundColor: colorBgLayout }}
        >
            {isText ? (
                <MotionContainer className="flex h-80 items-center justify-center font-bold md:text-6xl">
                    {TEXT.split('').map((letter, index) => (
                        <m.div key={index} variants={varients} className="xs:ml-1">
                            {letter}
                        </m.div>
                    ))}
                </MotionContainer>
            ) : (
                <MotionContainer className="flex flex-col items-center gap-6">
                    {imgs.map((img, index) => (
                        <m.img
                            key={index}
                            src={img}
                            style={{
                                objectFit: 'cover',
                                width: '480px',
                                height: isMulti ? '72px' : '320px',
                                margin: 'auto',
                                borderRadius: '8px',
                            }}
                            variants={varients}
                        />
                    ))}
                </MotionContainer>
            )}
        </div>
    );
}
