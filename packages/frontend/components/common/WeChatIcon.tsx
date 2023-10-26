'use client';

import { FC } from 'react';

import Image from 'next/image';
import Tippy from '@tippyjs/react/headless';
import Link from 'next/link';
import { AiFillWechat } from 'react-icons/ai';

interface Props {
    initialText: string;
}
const WeChatIcon: FC<Props> = ({ initialText }): JSX.Element => {
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
            <Link
                href="#"
                className="flex items-center no-underline transition-all duration-[0.3s] px-[11px] py-[9px] hover:bg-secondary_gray_light dark:hover:bg-secondary-dark hover:rounded-[6px] group/link"
            >
                <AiFillWechat className="text-[18px] fill-gray_light dark:fill-gray transition-all duration-[0.3s] mr-2 group-hover/link:fill-paragraph_light dark:group-hover/link:fill-white" />
                <span className="text-gray_light dark:text-gray transition-all duration-[0.3s] group-hover/link:text-paragraph_light dark:group-hover/link:text-white">
                    {initialText}
                </span>
            </Link>
        </Tippy>
    );
};

export default WeChatIcon;
