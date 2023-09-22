'use client';

import React, { useEffect, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineHome, AiOutlineIdcard, AiOutlineFile } from 'react-icons/ai';
import { BsBriefcase, BsTelephone } from 'react-icons/bs';
import { LiaCommentAltSolid } from 'react-icons/lia';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';

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
const NAV_CLOSE_CLASSES = ['-translate-x-full', 'md:translate-x-0'];
const NAV_OPEN_CLASSES = ['translate-x-0', 'transition-all', 'duration-[0.3s]'];
const NAV_VISIBILITY = 'nav-visibility';

export const Sidebar: React.FC<Props> = ({ navItems, onSectionChange }) => {
    const navRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(true);

    const [active, setActive] = useState<string | null>(null);

    const handleClick = (item: NavItem) => {
        setActive(item.href);
        onSectionChange(item.href);
    };
    const toggleNav = (visibility: boolean) => {
        const currentNav = navRef.current;
        if (!currentNav) return;

        const { classList } = currentNav;
        if (visibility) {
            // hide our nav
            classList.remove(...NAV_OPEN_CLASSES);
            classList.add(...NAV_CLOSE_CLASSES);
        } else {
            // show our nav
            classList.add(...NAV_OPEN_CLASSES);
            classList.remove(...NAV_CLOSE_CLASSES);
        }
    };

    const updateNavState = () => {
        toggleNav(visible);
        const newState = !visible;
        setVisible(newState);
        localStorage.setItem(NAV_VISIBILITY, JSON.stringify(newState));
    };

    useEffect(() => {
        const navState = localStorage.getItem(NAV_VISIBILITY);
        if (navState !== null) {
            const newState = JSON.parse(navState);
            setVisible(newState);
            toggleNav(!newState);
        } else {
            setVisible(true);
        }
    }, []);

    return (
        <div
            ref={navRef}
            id="sidebar"
            className="fixed h-screen pl-[39px] pr-[60px] md:pl-[39px] md:pr-[39px] flex flex-col bg-black md:bg-dark_bg duration-[0.3s] z-50"
        >
            <button
                onClick={updateNavState}
                className="absolute flex text-[30px] w-[45px] h-[45px] md:hidden justify-center items-center right-[-45px]
                
                text-highlight-light dark:text-highlight-dark  hover:scale-[0.98] transition self-end"
            >
                {visible ? <RiMenuFoldFill size={25} /> : <RiMenuUnfoldFill size={25} />}
            </button>
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
                                className="relative mb-[35px] h-[24px] group/item flex items-center no-underline "
                                onClick={() => handleClick(item)}
                            >
                                <Link
                                    href={item.href}
                                    className={`group/link ${
                                        active === item.href
                                            ? 'before:opacity-[0.15] before:scale-100 before:-translate-y-1/2 before:-translate-x-1/2 text-primary'
                                            : ''
                                    } flex items-center no-underline md:relative before:content-[''] before:absolute before:w-[46px] before:h-[46px] before:rounded-full before:bg-primary before:opacity-0 before:top-1/2 before:left-1/2 before:-translate-y-1/2 before:-translate-x-1/2 before:scale-0 before:transition-all before:duration-300`}
                                >
                                    <Icon
                                        className={`text-[18px] group-hover/link:fill-white transition-all duration-[0.3s] ${
                                            active === item.href ? 'fill-primary' : 'fill-gray '
                                        }`}
                                    />
                                    <span className="block md:hidden pl-[8px]">{item.label}</span>
                                </Link>
                                <span className="hidden md:block md:absolute whitespace-nowrap top-[-8px] left-5 py-[7px] px-[13px] md:bg-secondary-dark/75 rounded-[6px] md:opacity-0 md:group-hover/item:opacity-100   md:group-hover/item:left-[30px] transition-all duration-300">
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
