'use client';

import React, { useState } from 'react';
import { IconType } from 'react-icons';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineHome, AiOutlineIdcard, AiOutlineFile } from 'react-icons/ai';
import { BsBriefcase, BsTelephone } from 'react-icons/bs';
import { LiaCommentAltSolid } from 'react-icons/lia';

type NavItem = { label: string; icon: string; href: string };
interface Props {
    navItems: NavItem[];
    onSectionChange: (sectionId: string) => void;
}
type IconNames = 'home' | 'idCard' | 'file' | 'briefcase' | 'comment' | 'phone';

const ICONS: Record<IconNames, IconType> = {
    home: AiOutlineHome,
    idCard: AiOutlineIdcard,
    file: AiOutlineFile,
    briefcase: BsBriefcase,
    comment: LiaCommentAltSolid,
    phone: BsTelephone,
};

export const Sidebar: React.FC<Props> = ({ navItems, onSectionChange }) => {
    const [active, setActive] = useState<string | null>(null);

    const handleClick = (item: NavItem) => {
        setActive(item.href);
        onSectionChange(item.href);
    };

    return (
        <div id="sidebar" className="fixed h-screen px-[39px] flex flex-col">
            <div id="logo" className="h-1/5 text-center pt-[62px]">
                <Image src="/images/logo.png" alt="DenseWillow" width={23} height={30} />
            </div>
            <nav className=" h-3/5 flex items-center justify-center">
                <ul className="m-0 p-0 list-none">
                    {navItems.map((item) => {
                        const Icon = ICONS[item.icon as IconNames];
                        return (
                            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                            <li
                                key={item.href}
                                className="relative mb-[35px] h-[24px] file:group/item"
                                onClick={() => handleClick(item)}
                            >
                                <Link
                                    href={item.href}
                                    className={`group/link ${
                                        active === item.href
                                            ? 'before:opacity-[0.15] before:scale-100 before:-translate-y-1/2 before:-translate-x-1/2 text-primary'
                                            : ''
                                    } relative before:content-[''] before:absolute before:w-[46px] before:h-[46px] before:rounded-full before:bg-primary before:opacity-0 before:top-1/2 before:left-1/2 before:-translate-y-1/2 before:-translate-x-1/2 before:scale-0 before:transition-all before:duration-300`}
                                >
                                    <Icon
                                        className={`text-[18px] group-hover/link:fill-white transition-all duration-[0.3s] ${
                                            active === item.href ? 'fill-primary' : 'fill-gray '
                                        }`}
                                    />
                                </Link>
                                <span className="absolute whitespace-nowrap top-[-8px] left-5 py-[7px] px-[13px] bg-secondary-dark/75 rounded-[6px] opacity-0 group-hover/item:opacity-100 group-hover/item:left-[30px] transition-all duration-300">
                                    {item.label}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div id="toggle-mode" className="h-1/5 flex items-end pb-[62px]">
                <div id="outer" className="w-6 h-[35px] rounded-3xl bg-[#1e1e20]">
                    <div
                        id="inner"
                        className='relative w-3.5 h-3.5 mt-4 mx-auto rounded-[50%] bg-[#658df2]  before:absolute before:content-[""] before:w-3.5 before:h-3.5 before:rounded-[50%] before:left-[3px] before:-top-1 before:bg-[#1e1e20]'
                    />
                </div>
            </div>
        </div>
    );
};
