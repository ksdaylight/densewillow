'use client';

import { Sidebar } from '@frontend/components/common/Siderbar';
import { FC, useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import Image from 'next/image';
import Link from 'next/link';

import { FaLinkedinIn } from 'react-icons/fa';
import { BiLogoStackOverflow } from 'react-icons/bi';
import { AiFillGithub } from 'react-icons/ai';
import { random } from 'lodash';

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
    // const randomNumber = [
    //     58, 75, 7, 90, 95, 85, 59, 86, 15, 17, 67, 50, 20, 3, 62, 4, 86, 28, 38, 16, 17, 16, 9, 11,
    //     37, 17, 57, 39, 4, 36,
    // ]; 去除报错 Prop `style` did not match. Server: "top:87vh;left:84vw" Client: "top:54vh;left:82vw"
    // const generateSpanElements = () => {
    //     const elements = [];
    //     for (let i = 0; i < 15; i++) {
    //         const key = `meteor-${i}`; // Create a unique key
    //         const classItem = `absolute bg-red-700 w-[60px] h-[49px] left-[${random(
    //             300,
    //         )}px] top-[${random(300)}px]`; // bg-[url('/images/meteor.png')]
    //         elements.push(<span key={key} className={classItem} />);
    //     }
    //     return elements;
    // };

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
                    } bg-bg-none md:bg-[url('/images/bg-shape.png')] bg-no-repeat bg-[40vw_-24px]`}
                >
                    <div
                        id="meteor-shower"
                        className="absolute w-full h-screen overflow-hidden right-0 top-0 z-10"
                    >
                        {/* //top-[32px]这样的任意值不能使用 bug  */}
                        {Array.from({ length: 15 }).map((_, index) => (
                            <span
                                key={`meteor${String(index)}`}
                                id="meteor"
                                style={{
                                    top: `${random(80)}vh`,
                                    left: `${random(80)}vw`,
                                    animation: `meteor ${random(5000) + 3000}ms linear infinite`,
                                    animationDelay: `${random(5000)}ms`,
                                }}
                                className={`absolute bg-[url('/images/meteor.png')] w-[60px] h-[49px] opacity-0 z-10`} // animate-[meteor_4s_linear_infinite]
                            />
                        ))}
                    </div>
                    <div className="relative container mx-auto z-20 flex items-center justify-center">
                        <div className="flex flex-wrap md:w-3/4 min-w-0">
                            <div className="w-full lg:w-1/2 px-[32px] ">
                                <div id="info" className="pt-[80px] md:pt-[281px]">
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
                                    <div className="socials mt-[70px] md:mt-[191px]">
                                        <ul className="flex m-0 p-0 list-none flex-wrap justify-between md:justify-start">
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
                            <div className="w-full lg:w-1/2  lg:h-screen flex items-center md:justify-end justify-start h-[unset] my-10 px-[32px]">
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
