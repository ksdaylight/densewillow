'use client';

import { Sidebar } from '@frontend/components/common/Siderbar';
import { FC, useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import Image from 'next/image';
import Link from 'next/link';

import { FaLinkedinIn } from 'react-icons/fa';
import { BiLogoFacebook, BiLogoStackOverflow } from 'react-icons/bi';
import { AiFillGithub } from 'react-icons/ai';

const navItems = [
    { href: '#home', icon: 'home', label: 'Home' },
    { href: '#about_me', icon: 'idCard', label: ' About Me' },
    { href: '#my_resume', icon: 'file', label: 'My Resume' },
    { href: '#my_work', icon: 'briefcase', label: 'My Work' },
    { href: '#testimonial', icon: 'comment', label: 'Testimonial' },
    { href: '#contact_me', icon: 'phone', label: 'Contact Me' },
];
interface Props {}
const PortfolioClient: FC<Props> = (): JSX.Element => {
    const [currentSection, setCurrentSection] = useState<string | null>('#home');
    const el = useRef<HTMLHeadingElement>(null);
    const handleSectionChange = (sectionId: string) => {
        setCurrentSection(sectionId);
    };
    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['Front-End web developer', 'Back-End web developer', 'Web designer'],
            loop: true,
            typeSpeed: 70,
            backSpeed: 10,
        });

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, []);
    return (
        <div className="min-h-screen bg-dark_bg ">
            <Sidebar navItems={navItems} onSectionChange={handleSectionChange} />
            <main className="pl-0 pt-[50px] md:pl-[102px] md:pt-0 ">
                <section
                    className={`${
                        currentSection === '#home' ? 'block' : 'hidden'
                    } bg-[url('/images/bg-shape.png')] bg-no-repeat bg-[40vw_-24px]`}
                >
                    <div className="container mx-auto">
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-1/2 ">
                                <div id="info" className="pt-[281px]">
                                    <Image
                                        src="/images/person-circle.png"
                                        alt="person circle"
                                        width={45}
                                        height={45}
                                        className="mb-[24px]"
                                    />
                                    <h1 className="mb-[24px]">
                                        <span className="text-gray">I’m</span> Mojtaba,
                                    </h1>
                                    <div className="flex  items-center mb-[16px]">
                                        <h2 ref={el} className="text-gray mr-[2px]">
                                            Front-End web developer
                                        </h2>
                                    </div>
                                    <p className="max-w-[430px] mb-[74px]">
                                        I design and develop services for customers of all sizes,
                                        specializing in creating stylish, modern websites, web
                                        services, and online stores.
                                    </p>
                                    <a
                                        href="assets/files/cv.pdf"
                                        download
                                        className="btn-custom-blue"
                                    >
                                        Download CV
                                    </a>
                                    <div className="socials mt-[191px]">
                                        <ul className="flex m-0 p-0 list-none">
                                            <li className="mr-[8px]">
                                                <Link
                                                    href="#"
                                                    className="flex items-center no-underline transition-all duration-[0.3s] px-[11px] py-[9px] hover:bg-secondary-dark hover:rounded-[6px] group/link"
                                                >
                                                    <FaLinkedinIn className="text-[18px] fill-gray transition-all duration-[0.3s] mr-2 group-hover/link:fill-white" />
                                                    <span className="text-gray transition-all duration-[0.3s] group-hover/link:fill-white">
                                                        Linkedin
                                                    </span>
                                                </Link>
                                            </li>
                                            <li className="mr-[8px]">
                                                <Link
                                                    href="#"
                                                    className="flex items-center no-underline transition-all duration-[0.3s] px-[11px] py-[9px] hover:bg-secondary-dark hover:rounded-[6px] group/link"
                                                >
                                                    <BiLogoFacebook className="text-[18px] fill-gray transition-all duration-[0.3s] mr-2 group-hover/link:fill-white" />
                                                    <span className="text-gray transition-all duration-[0.3s] group-hover/link:fill-white">
                                                        Facebook
                                                    </span>
                                                </Link>
                                            </li>
                                            <li className="mr-[8px]">
                                                <Link
                                                    href="#"
                                                    className="flex items-center no-underline transition-all duration-[0.3s] px-[11px] py-[9px] hover:bg-secondary-dark hover:rounded-[6px] group/link"
                                                >
                                                    <AiFillGithub className="text-[18px] fill-gray transition-all duration-[0.3s] mr-2 group-hover/link:fill-white" />
                                                    <span className="text-gray transition-all duration-[0.3s] group-hover/link:fill-white">
                                                        Github
                                                    </span>
                                                </Link>
                                            </li>
                                            <li className="mr-[8px]">
                                                <Link
                                                    href="#"
                                                    className="flex items-center no-underline transition-all duration-[0.3s] px-[11px] py-[9px] hover:bg-secondary-dark hover:rounded-[6px] group/link"
                                                >
                                                    <BiLogoStackOverflow className="text-[18px] fill-gray transition-all duration-[0.3s] mr-2 group-hover/link:fill-white" />
                                                    <span className="text-gray transition-all duration-[0.3s] group-hover/link:fill-white">
                                                        Stack Overflow
                                                    </span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2  h-screen flex items-center justify-end">
                                <Image
                                    src="/images/person-home.png"
                                    alt="person home"
                                    className="transition-all duration-[0.3s] rounded-[8px] hover:saturate-[200%] hover:sepia-[1]"
                                    width={546}
                                    height={843}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="about"
                    className={`bg-[#666] ${currentSection === '#about_me' ? 'block' : 'hidden'}`}
                >
                    About
                </section>
                <section
                    id="resume"
                    className={`bg-[#666] ${currentSection === '#my_resume' ? 'block' : 'hidden'}`}
                >
                    Resume
                </section>
                <section
                    id="work"
                    className={`bg-[#666] ${currentSection === '#my_work' ? 'block' : 'hidden'}`}
                >
                    Work
                </section>
                <section
                    id="testimonial"
                    className={`bg-[#666] ${
                        currentSection === '#testimonial' ? 'block' : 'hidden'
                    }`}
                >
                    Testimonial
                </section>
                <section
                    id="contact"
                    className={`bg-[#666] ${currentSection === '#contact_me' ? 'block' : 'hidden'}`}
                >
                    Contact
                </section>
            </main>
        </div>
    );
};
export default PortfolioClient;
