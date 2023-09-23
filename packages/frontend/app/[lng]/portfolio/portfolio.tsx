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
    const [currentSection, setCurrentSection] = useState<string | null>('#about_me');
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
                            <div className="w-full lg:w-1/2 px-[32px]">
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
                                        className="btn-custom-base bg-[#262f48]"
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
                    id="about_me"
                    className={` ${
                        currentSection === '#about_me' ? 'block' : 'hidden'
                    } md:pt-[64px]`}
                >
                    <div className="relative container mx-auto z-20 flex items-center justify-center">
                        <div className="flex flex-wrap w-3/4 min-w-0">
                            <div className="w-full lg:w-1/3 2xl:w-1/2  lg:h-screen flex items-start ">
                                <Image
                                    src="/images/person-about.png"
                                    alt="person about"
                                    className="transition-all duration-[0.3s] rounded-[8px] hover:saturate-[200%] hover:sepia-[1]"
                                    width={432}
                                    height={657}
                                />
                            </div>
                            <div className="w-full lg:w-2/3 2xl:w-1/2 px-[12px]">
                                <header className="header-has-bg mt-[10px] mb-[42px]">
                                    <Image
                                        src="/images/h1-bg.png"
                                        alt="h1 bg"
                                        width={166}
                                        height={75}
                                        className="header-has-bg-image"
                                    />
                                    <h1>About Me</h1>
                                </header>
                                <h2 className="text-gray mb-[16px]">Front-End web developer</h2>
                                <p className="max-w-[560px] text-gray">
                                    {`I'm a web developer with +5 years experience. I work on projects
                                    as a Front-End and Back-End developer. as a Front-End developer,
                                    I'm Fluent in HTML, CSS, Bootstrap, SCSS, Javascript, jQuery,
                                    Vue.js, and as a Back-End developer, I'm fluent in PHP,
                                    WordPress, and Laravel.
                                    
                                    This is my motto: "Everyone can start, but only a few can
                                    finish`}
                                </p>
                                <div id="about_items">
                                    <div className="container">
                                        <div className="w-full flex">
                                            <div className="w-1/2 mt-[30px] mb-[48px]">
                                                <div className="flex mb-[16px]">
                                                    <span className="title">Name:</span>
                                                    <span className="text-gray ml-[4px]">
                                                        Mojtaba
                                                    </span>
                                                </div>
                                                <div className="flex mb-[16px]">
                                                    <span className="title">Age:</span>
                                                    <span className="text-gray  ml-[4px]">29</span>
                                                </div>
                                                <div className="flex mb-[16px]">
                                                    <span className="title">Location:</span>
                                                    <span className="text-gray  ml-[4px]">
                                                        Frankfurt
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="w-1/2 mt-[30px] mb-[48px]">
                                                <div className="flex mb-[16px]">
                                                    <span className="title">
                                                        Years of experience:
                                                    </span>
                                                    <span className="text-gray  ml-[4px]">
                                                        +5 Years
                                                    </span>
                                                </div>
                                                <div className="flex mb-[16px]">
                                                    <span className="title">Phone:</span>
                                                    <span className="text-gray  ml-[4px]">
                                                        +1 234 567 8901
                                                    </span>
                                                </div>
                                                <div className="flex mb-[16px]">
                                                    <span className="title whitespace-nowrap">
                                                        E-mail:
                                                    </span>
                                                    <span className="text-gray ml-[4px]">
                                                        smo.hayati@gmail.com
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap flex-col md:flex-row">
                                    <a
                                        href="assets/files/cv.pdf"
                                        className="btn-custom-base bg-[#262f48] mr-[24px] mb-[16px] md:mb-0 w-full md:w-auto text-center"
                                        download=""
                                    >
                                        Download CV
                                    </a>
                                    <a
                                        href="#contact_me"
                                        className="btn-custom-base bg-secondary-dark w-full md:w-auto text-center"
                                        download=""
                                    >
                                        Message me
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="resume"
                    className={`${currentSection === '#my_resume' ? 'block' : 'hidden'} pt-[64px]`}
                >
                    Resume
                </section>
                <section
                    id="work"
                    className={` ${currentSection === '#my_work' ? 'block' : 'hidden'} pt-[64px]`}
                >
                    Work
                </section>
                <section
                    id="testimonial"
                    className={`${
                        currentSection === '#testimonial' ? 'block' : 'hidden'
                    } pt-[64px]`}
                >
                    Testimonial
                </section>
                <section
                    id="contact"
                    className={`${currentSection === '#contact_me' ? 'block' : 'hidden'} pt-[64px]`}
                >
                    Contact
                </section>
            </main>
        </div>
    );
};
export default PortfolioClient;
