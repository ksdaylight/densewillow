'use client';

import { FC } from 'react';

import Image from 'next/image';
import Tippy from '@tippyjs/react/headless';

interface Props {
    children: React.ReactElement;
}
const WeChatWrap: FC<Props> = ({ children }): JSX.Element => {
    return (
        <Tippy
            key="show-weChat"
            render={(attrs) => (
                <div
                    className="py-[7px] px-[13px] bg-secondary_gray_light dark:bg-secondary-dark/75 rounded-[6px] transition-all duration-300"
                    tabIndex={-1}
                    {...attrs}
                >
                    <Image
                        src="/images/Miwen's-WeChat.jpg"
                        alt="Miwen's WeChat"
                        className="rounded-[8px]"
                        width={180}
                        height={240}
                    />
                </div>
            )}
        >
            {children}
        </Tippy>
    );
};

export default WeChatWrap;
