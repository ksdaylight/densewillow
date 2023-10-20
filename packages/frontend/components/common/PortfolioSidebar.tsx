'use client';

import React, { useEffect, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineHome, AiOutlineIdcard, AiOutlineFile } from 'react-icons/ai';
import { BsBriefcase, BsTelephone } from 'react-icons/bs';
import { LiaCommentAltSolid } from 'react-icons/lia';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';
import useDarkMode from '@frontend/hooks/useDarkMode';
import { fallbackLng } from '@frontend/app/i18n/settings';

interface Props {
    activeItem: string | null;
    className?: string;
    lng?: string;
}
type IconNames = 'home' | 'idCard' | 'file' | 'briefcase' | 'comment' | 'phone';

const navItems = [
    { href: '/', icon: 'home', label: 'Home' },
    { href: '/about-me', icon: 'idCard', label: ' About Me' },
    { href: '/my-resume', icon: 'file', label: 'My Resume' },
    { href: '/my-work', icon: 'briefcase', label: 'My Work' },
    { href: '/blogs', icon: 'comment', label: 'My Blog' },
    { href: '/contact-me', icon: 'phone', label: 'Contact Me' },
];

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

export const PortfolioSidebar: React.FC<Props> = ({ activeItem, className, lng = fallbackLng }) => {
    const navRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(true);

    const { toggleTheme } = useDarkMode();
    // const handleClick = (item: NavItem) => {
    //     onSectionChange(item.href);
    // };
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
            className={`fixed h-screen pl-[39px] pr-[60px] md:pl-[39px] md:pr-[39px] flex flex-col bg-[#dbe4fc] md:bg-white dark:bg-black md:dark:bg-dark_bg  duration-[0.3s] z-40 ${className}`}
        >
            <button
                onClick={updateNavState}
                className="absolute flex text-[30px] w-[45px] h-[45px] md:hidden justify-center items-center right-[-45px] bg-[#dbe4fc] dark:bg-black               
                text-highlight-light dark:text-highlight-dark  hover:scale-[0.98] transition self-end"
            >
                {visible ? <RiMenuFoldFill size={25} /> : <RiMenuUnfoldFill size={25} />}
            </button>
            <div id="logo" className="h-1/5 text-center pt-[62px]">
                <Image
                    src="/images/logo.png"
                    alt="DenseWillow"
                    width={23}
                    height={30}
                    className="invert dark:invert-0"
                />
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
                                // onClick={() => handleClick(item)}
                            >
                                <Link
                                    href={`/${lng}${item.href}`}
                                    className={`group/link ${
                                        activeItem === item.href
                                            ? 'before:opacity-[0.15] before:scale-100 before:-translate-y-1/2 before:-translate-x-1/2 text-primary'
                                            : ''
                                    } flex items-center no-underline md:relative before:content-[''] before:absolute before:w-[46px] before:h-[46px] before:rounded-full before:bg-primary before:opacity-0 before:top-1/2 before:left-1/2 before:-translate-y-1/2 before:-translate-x-1/2 before:scale-0 before:transition-all before:duration-300`}
                                >
                                    <Icon
                                        className={`text-[18px]  group-hover/link:fill-paragraph_light dark:group-hover/link:fill-white transition-all duration-[0.3s] ${
                                            activeItem === item.href
                                                ? 'fill-primary'
                                                : 'fill-gray_light dark:fill-gray '
                                        }`}
                                    />
                                    <span className="block md:hidden pl-[8px]">{item.label}</span>
                                </Link>
                                <span className="hidden md:block md:absolute whitespace-nowrap top-[-8px] left-5 py-[7px] px-[13px] bg-secondary_gray_light dark:bg-secondary-dark/75 rounded-[6px] md:opacity-0 md:group-hover/item:opacity-100   md:group-hover/item:left-[30px] transition-all duration-300">
                                    {item.label}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div id="toggle-mode" className="h-1/5 flex items-end pb-[62px]">
                <div
                    id="outer"
                    className="w-6 h-[35px] rounded-3xl bg-secondary_gray_light dark:bg-[#1e1e20] cursor-pointer transition-all duration-[0.3s]"
                    onClick={toggleTheme}
                >
                    <div
                        id="inner"
                        className='relative w-3.5 h-3.5 mt-[5px] dark:mt-4 mx-auto rounded-[50%] bg-[#658df2] transition-all duration-[0.3s] before:absolute before:content-[""] before:w-3.5 before:h-3.5 before:rounded-[50%] before:left-[3px] before:-top-1 before:bg-secondary_gray_light dark:before:bg-[#24244f] before:opacity-0 dark:before:opacity-100 before:transition-all before:duration-[0.3s]'
                    />
                </div>
            </div>
        </div>
    );
};
