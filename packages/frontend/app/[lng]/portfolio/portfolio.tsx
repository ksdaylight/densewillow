'use client';

import { Sidebar } from '@frontend/components/common/Siderbar';
import { FC, useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import Shuffle from 'shufflejs';
import Image from 'next/image';
import Link from 'next/link';

import { FaLinkedinIn } from 'react-icons/fa';
import { LiaUniversitySolid, LiaMapMarkerSolid } from 'react-icons/lia';
import { BiLogoStackOverflow } from 'react-icons/bi';
import { BsBriefcase, BsTelephone, BsEnvelope } from 'react-icons/bs';
import { AiFillGithub } from 'react-icons/ai';
import { isNil, random } from 'lodash';
import WorksDialog, { WorkInfo } from '@frontend/components/common/WorksDialog';
import ContactForm from '@frontend/components/common/contactForm';

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
    const typedEl = useRef<HTMLHeadingElement>(null);
    const [currentGroup, setCurrentGroup] = useState('All');

    const shuffleRef = useRef<Shuffle | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [workDialogIsOpen, setWorkDialogIsOpen] = useState(false);
    const [workDialogInfo, setWorkDialogInfo] = useState<WorkInfo | null>(null);

    const handleSectionChange = (sectionId: string) => {
        setCurrentSection(sectionId);
    };
    const handleChangeSectionClick = (sectionId: string) => {
        setCurrentSection(sectionId);
    };

    const handleWorkItemOnClick = (info?: WorkInfo) => {
        setWorkDialogInfo(info || null);
        setWorkDialogIsOpen(true);
    };

    const handleFilter = (group: string) => {
        setCurrentGroup(group);

        if (shuffleRef.current) {
            if (group === 'All') {
                shuffleRef.current.filter();
            } else {
                shuffleRef.current.filter((element) => {
                    const groups = JSON.parse(element.getAttribute('data-groups') || '[]');
                    return groups.includes(group);
                });
            }
        }
    };

    useEffect(() => {
        if (isNil(containerRef.current)) return;
        shuffleRef.current = new Shuffle(containerRef.current, {
            itemSelector: '.js-item',
        });

        // eslint-disable-next-line consistent-return
        return () => {
            if (shuffleRef.current) {
                shuffleRef.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        const typed = new Typed(typedEl.current, {
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
        <div className="min-h-scree">
            <Sidebar
                navItems={navItems}
                onSectionChange={handleSectionChange}
                activeItem={currentSection}
                className={`${workDialogIsOpen ? 'blur-sm' : 'blur-none'}`}
            />
            <main className="pl-0 pt-[50px] md:pl-[102px] md:pt-0 ">
                <section
                    className={`${
                        currentSection === '#home' ? 'block' : 'hidden'
                    } bg-none md:bg-[url('/images/bg-shape-light.png')] md:dark:bg-[url('/images/bg-shape.png')] bg-no-repeat bg-[40vw_-24px]`}
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
                                        <span className="text-gray_light dark:text-gray">I’m </span>
                                        Mojtaba,
                                    </h1>
                                    <div className="flex  items-center mb-[16px]">
                                        <h2
                                            ref={typedEl}
                                            className="text-gray_light dark:text-gray mr-[2px]"
                                        >
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
                                        className="btn-custom-base bg-[#E9EFFF] dark:bg-[#262f48] text-primary"
                                    >
                                        Download CV
                                    </a>
                                    <div className="socials mt-[70px] md:mt-[191px]">
                                        <ul className="flex m-0 p-0 list-none flex-wrap justify-between md:justify-start">
                                            <li className="mr-[8px]">
                                                <Link
                                                    href="#"
                                                    className="flex items-center no-underline transition-all duration-[0.3s] px-[11px] py-[9px] hover:bg-secondary_gray_light dark:hover:bg-secondary-dark hover:rounded-[6px] group/link"
                                                >
                                                    <FaLinkedinIn className="text-[18px] fill-gray_light dark:fill-gray transition-all duration-[0.3s] mr-2 group-hover/link:fill-paragraph_light dark:group-hover/link:fill-white" />
                                                    <span className="text-gray_light dark:text-gray transition-all duration-[0.3s] group-hover/link:text-paragraph_light dark:group-hover/link:text-white">
                                                        Linkedin
                                                    </span>
                                                </Link>
                                            </li>

                                            <li className="mr-[8px]">
                                                <Link
                                                    href="#"
                                                    className="flex items-center no-underline transition-all duration-[0.3s] px-[11px] py-[9px] hover:bg-secondary_gray_light dark:hover:bg-secondary-dark hover:rounded-[6px] group/link"
                                                >
                                                    <AiFillGithub className="text-[18px] fill-gray_light dark:fill-gray transition-all duration-[0.3s] mr-2 group-hover/link:fill-paragraph_light dark:group-hover/link:fill-white" />
                                                    <span className="text-gray_light dark:text-gray transition-all duration-[0.3s] group-hover/link:text-paragraph_light dark:group-hover/link:text-white">
                                                        Github
                                                    </span>
                                                </Link>
                                            </li>
                                            <li className="mr-[8px]">
                                                <Link
                                                    href="#"
                                                    className="flex items-center no-underline transition-all duration-[0.3s] px-[11px] py-[9px] hover:bg-secondary_gray_light dark:hover:bg-secondary-dark hover:rounded-[6px] group/link"
                                                >
                                                    <BiLogoStackOverflow className="text-[18px] fill-gray_light dark:fill-gray transition-all duration-[0.3s] mr-2 group-hover/link:fill-paragraph_light dark:group-hover/link:fill-white" />
                                                    <span className="text-gray_light dark:text-gray transition-all duration-[0.3s] group-hover/link:text-paragraph_light dark:group-hover/link:text-white">
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
                    className={`${
                        currentSection === '#about_me' ? 'block' : 'hidden'
                    } md:pt-[64px]`}
                >
                    <div className="relative container mx-auto z-20 flex items-center justify-center flex-col">
                        <div className="flex flex-wrap w-3/4 min-w-0 h-auto">
                            <div className="w-full lg:w-1/3 2xl:w-1/2 flex items-start ">
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
                                        src="/images/h1-bg-light.png"
                                        alt="h1 bg"
                                        width={166}
                                        height={75}
                                        className="dark:hidden"
                                    />
                                    <Image
                                        src="/images/h1-bg.png"
                                        alt="h1 bg"
                                        width={166}
                                        height={75}
                                        className="hidden dark:block"
                                    />
                                    <h1>About Me</h1>
                                </header>
                                <h2 className="text-gray_light dark:text-gray mb-[16px]">
                                    Front-End web developer
                                </h2>
                                <p className="max-w-[560px] text-paragraph_light dark:text-gray">
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
                                        <div className="w-full flex flex-col md:flex-row">
                                            <div className="w-full md:w-1/2 mt-[30px] md:mb-[48px]">
                                                <div className="flex mb-[16px]">
                                                    <span className="title">Name:</span>
                                                    <span className="text-gray_light dark:text-gray ml-[4px]">
                                                        Mojtaba
                                                    </span>
                                                </div>
                                                <div className="flex mb-[16px]">
                                                    <span className="title">Age:</span>
                                                    <span className="text-gray_light dark:text-gray  ml-[4px]">
                                                        29
                                                    </span>
                                                </div>
                                                <div className="flex mb-[16px]">
                                                    <span className="title">Location:</span>
                                                    <span className="text-gray_light dark:text-gray ml-[4px]">
                                                        Frankfurt
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="w-full md:w-1/2 md:mt-[30px] mb-[48px]">
                                                <div className="flex mb-[16px]">
                                                    <span className="title">
                                                        Years of experience:
                                                    </span>
                                                    <span className="text-gray_light dark:text-gray ml-[4px]">
                                                        +5 Years
                                                    </span>
                                                </div>
                                                <div className="flex mb-[16px]">
                                                    <span className="title">Phone:</span>
                                                    <span className="text-gray_light dark:text-gray ml-[4px]">
                                                        +1 234 567 8901
                                                    </span>
                                                </div>
                                                <div className="flex mb-[16px]">
                                                    <span className="title whitespace-nowrap">
                                                        E-mail:
                                                    </span>
                                                    <span className="text-gray_light dark:text-gray ml-[4px]">
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
                                        className="btn-custom-base bg-[#E9EFFF] dark:bg-[#262f48] text-primary mr-[24px] mb-[16px] md:mb-0 w-full md:w-auto text-center"
                                        download=""
                                    >
                                        Download CV
                                    </a>
                                    <a
                                        href="#contact_me"
                                        className="btn-custom-base bg-secondary_gray_light dark:bg-secondary-dark text-paragraph_light dark:text-primary  w-full md:w-auto text-center"
                                        onClick={() => handleChangeSectionClick('#contact_me')}
                                    >
                                        Message me
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div
                            id="row-languages-skills"
                            className="flex flex-wrap w-3/4 min-w-0 mt-[126px]"
                        >
                            <div
                                id="languages-key-skills"
                                className="w-full lg:w-1/2 md:pr-3 xl:pr-[160px]"
                            >
                                <div id="languages">
                                    <header className="header-custom">
                                        <h2>Languages</h2>
                                    </header>
                                    <ul className="items">
                                        <li className="flex items-center justify-between mt-[38px] mb-[43px]">
                                            <div>
                                                <h3 className="mt-[4px]">English</h3>
                                                <span className="text-gray_light dark:text-gray">
                                                    Native
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                                <span className="rate-span before:bg-gray_light after:bg-gray_light dark:before:bg-secondary-dark dark:after:bg-secondary-dark" />
                                            </div>
                                        </li>
                                        <li className="flex items-center justify-between mt-[38px] mb-[43px]">
                                            <div>
                                                <h3>French</h3>
                                                <span className="text-gray_light dark:text-gray">
                                                    Conversational
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                                <span className="rate-span before:bg-gray_light after:bg-gray_light dark:before:bg-secondary-dark dark:after:bg-secondary-dark" />
                                                <span className="rate-span before:bg-gray_light after:bg-gray_light dark:before:bg-secondary-dark dark:after:bg-secondary-dark" />
                                                <span className="rate-span before:bg-gray_light after:bg-gray_light dark:before:bg-secondary-dark dark:after:bg-secondary-dark" />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="key-skills">
                                    <header className="header-custom">
                                        <h2>Key Skills</h2>
                                    </header>
                                    <ul className="mt-[53px]">
                                        <li className="flex justify-between items-center mb-[32px]">
                                            <h3>Problem Solving</h3>
                                            <div className="flex">
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                            </div>
                                        </li>
                                        <li className="flex justify-between items-center mb-[32px]">
                                            <h3>Team working</h3>
                                            <div className="flex">
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                            </div>
                                        </li>
                                        <li className="flex justify-between items-center">
                                            <h3>Communication</h3>
                                            <div className="flex">
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div id="web-skills" className="w-full lg:w-1/2 mt-12 lg:mt-0">
                                <header className="header-custom">
                                    <h2>My Web Skills</h2>
                                </header>
                                <div className="container w-full">
                                    <div className="flex flex-wrap mt-[42px] -mx-5">
                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/html5.png"
                                                    alt="html5"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">HTML 5</h3>
                                                <span className="dark:dark:text-[#FF9F76] text-gray_light">
                                                    over 5 years
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/css3.png"
                                                    alt="css3"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">CSS 3</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    over 5 years
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/bootstrap.png"
                                                    alt="bootstrap"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">Bootstrap</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    4 years
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/vuejs.png"
                                                    alt="vuejs"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">Vue.js</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    about 3 years
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/js.png"
                                                    alt="JavaScript"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">JavaScript</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    3 years
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/jquery.png"
                                                    alt="jQuery"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">jQuery</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    about 2 years
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/jquery.png"
                                                    alt="jQuery"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">jQuery</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    about 2 years
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/jquery.png"
                                                    alt="jQuery"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">jQuery</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    about 2 years
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/jquery.png"
                                                    alt="jQuery"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">jQuery</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    about 2 years
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/jquery.png"
                                                    alt="jQuery"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">jQuery</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    about 2 years
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="resume"
                    className={`${
                        currentSection === '#my_resume' ? 'block' : 'hidden'
                    } pt-[64px] pb-[115px] bg-none md:bg-[url('/images/bg-shape-light.png')] md:dark:bg-[url('/images/bg-shape.png')] bg-no-repeat bg-[40vw_374px]`}
                >
                    <div className="text-center">
                        <header className="header-has-bg mb-16">
                            <Image
                                src="/images/h1-bg-light.png"
                                alt="h1 bg"
                                width={166}
                                height={75}
                                className="dark:hidden"
                            />
                            <Image
                                src="/images/h1-bg.png"
                                alt="h1 bg"
                                width={166}
                                height={75}
                                className="hidden dark:block"
                            />
                            <h1>My Resume</h1>
                        </header>
                        <div className="relative flex items-center justify-center z-20">
                            <div className="flex flex-wrap w-3/4 min-w-0 h-auto">
                                <div
                                    id="education"
                                    className="w-full xl:w-1/2 flex flex-col md:pr-[34px] px-3"
                                >
                                    <header className="header-custom mb-[42px]">
                                        <h2>Education</h2>
                                    </header>
                                    <div className="items">
                                        <div className="flex mb-[42px] group relative md:static">
                                            <div className="resume-item-icon">
                                                <LiaUniversitySolid className="fill-primary" />
                                            </div>
                                            <div className="resume-item-box">
                                                <span className="inline-block text-lg font-normal mb-4">
                                                    2014 - 2018
                                                </span>
                                                <h2 className="text-primary mb-4">{`Engineer's degree`}</h2>
                                                <p className="text-lg font-normal text-gray_light dark:text-gray max-w-[345px]">
                                                    Bmet minim mollit deserunt llamco est sit aliqua
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex mb-[42px] group relative md:static">
                                            <div className="resume-item-icon">
                                                <LiaUniversitySolid className="las la-university" />
                                            </div>
                                            <div className="resume-item-box">
                                                <span className="inline-block text-lg font-normal mb-4">
                                                    2010 - 2014
                                                </span>
                                                <h2 className="mb-4">High School</h2>
                                                <p className="text-lg font-normal text-gray_light dark:text-gray max-w-[345px]">
                                                    Bmet minim mollit deserunt llamco est sit aliqua
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex group relative md:static">
                                            <div className="resume-item-icon">
                                                <LiaUniversitySolid className="las la-university" />
                                            </div>
                                            <div className="resume-item-box">
                                                <span className="inline-block text-lg font-normal mb-4">
                                                    2001 - 2010
                                                </span>
                                                <h2 className="mb-4">Elementary School</h2>
                                                <p className="text-lg font-normal text-gray_light dark:text-gray max-w-[345px]">
                                                    Bmet minim mollit deserunt llamco est sit aliqua
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="experience"
                                    className="w-full xl:w-1/2 flex flex-col px-3 md:pl-[34px] mt-[100px] xl:mt-0"
                                >
                                    <header className="header-custom mb-[42px]">
                                        <h2>Experience</h2>
                                    </header>
                                    <div className="items">
                                        <div className="flex mb-[42px] group relative md:static">
                                            <div className="resume-item-icon">
                                                <BsBriefcase className="fill-primary" />
                                            </div>
                                            <div className="resume-item-box">
                                                <span className="inline-block text-lg font-normal mb-4">
                                                    2020 - Present
                                                </span>
                                                <h2 className="text-primary mb-4">
                                                    Senior Web Developer
                                                </h2>
                                                <p className="text-lg font-normal text-gray_light dark:text-gray max-w-[345px]">
                                                    Bmet minim mollit deserunt llamco est sit aliqua
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex mb-[42px] group relative md:static">
                                            <div className="resume-item-icon">
                                                <BsBriefcase className="las la-briefcase" />
                                            </div>
                                            <div className="resume-item-box">
                                                <span className="inline-block text-lg font-normal mb-4">
                                                    2019 - 2020
                                                </span>
                                                <h2 className="mb-4">Mid-Level Web Developer</h2>
                                                <p className="text-lg font-normal text-gray_light dark:text-gray max-w-[345px]">
                                                    Bmet minim mollit deserunt llamco est sit aliqua
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex group relative md:static">
                                            <div className="resume-item-icon">
                                                <BsBriefcase className="las la-briefcase" />
                                            </div>
                                            <div className="resume-item-box">
                                                <span className="year">2017 - 2019</span>
                                                <h2 className="mb-4">Junior Web Developer</h2>
                                                <p className="text-lg font-normal text-gray_light dark:text-gray max-w-[345px]">
                                                    Bmet minim mollit deserunt llamco est sit aliqua
                                                    Bmet minim mollit deserunt llamco est sit aliqua
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="work"
                    className={` ${currentSection === '#my_work' ? 'block' : 'hidden'} ${
                        workDialogIsOpen ? 'blur-sm' : 'blur-none'
                    } pt-[64px]`}
                >
                    <div className="text-center">
                        <header className="header-has-bg">
                            <Image
                                src="/images/h1-bg-light.png"
                                alt="h1 bg"
                                width={166}
                                height={75}
                                className="dark:hidden"
                            />
                            <Image
                                src="/images/h1-bg.png"
                                alt="h1 bg"
                                width={166}
                                height={75}
                                className="hidden dark:block"
                            />
                            <h1>My Work</h1>
                        </header>
                    </div>
                    <div className="text-center mt-[81px] mb-[55px]">
                        <button
                            className={`mx-2 px-4 py-2 border-none mb-4 ${
                                currentGroup === 'All'
                                    ? 'rounded-lg bg-secondary_gray_light dark:bg-secondary-dark text-[#fff]'
                                    : 'rounded-none bg-transparent text-secondary_gray'
                            }`}
                            onClick={() => handleFilter('All')}
                        >
                            <h4
                                className={
                                    currentGroup === 'All'
                                        ? 'text-paragraph_light dark:text-[#fff]'
                                        : 'text-gray_light dark:text-secondary_gray'
                                }
                            >
                                All
                            </h4>
                        </button>
                        <button
                            className={`mx-2 px-4 py-2 border-none mb-4 ${
                                currentGroup === 'Web Developing'
                                    ? 'rounded-lg bg-secondary_gray_light dark:bg-secondary-dark text-[#fff]'
                                    : 'rounded-none bg-transparent text-secondary_gray'
                            }`}
                            onClick={() => handleFilter('Web Developing')}
                        >
                            <h4
                                className={
                                    currentGroup === 'Web Developing'
                                        ? 'text-paragraph_light dark:text-[#fff]'
                                        : 'text-gray_light dark:text-secondary_gray'
                                }
                            >
                                Web Developing
                            </h4>
                        </button>
                        <button
                            className={`mx-2 px-4 py-2 border-none mb-4 ${
                                currentGroup === 'Video'
                                    ? 'rounded-lg bg-secondary_gray_light dark:bg-secondary-dark text-[#fff]'
                                    : 'rounded-none bg-transparent text-secondary_gray'
                            }`}
                            onClick={() => handleFilter('Video')}
                        >
                            <h4
                                className={
                                    currentGroup === 'Video'
                                        ? 'text-paragraph_light dark:text-[#fff]'
                                        : 'text-gray_light dark:text-secondary_gray'
                                }
                            >
                                Video
                            </h4>
                        </button>
                        <button
                            className={`mx-2 px-4 py-2 border-none mb-4 ${
                                currentGroup === 'SEO'
                                    ? 'rounded-lg bg-secondary_gray_light dark:bg-secondary-dark text-[#fff]'
                                    : 'rounded-none bg-transparent text-secondary_gray'
                            }`}
                            onClick={() => handleFilter('SEO')}
                        >
                            <h4
                                className={
                                    currentGroup === 'SEO'
                                        ? 'text-paragraph_light dark:text-[#fff]'
                                        : 'text-gray_light dark:text-secondary_gray'
                                }
                            >
                                SEO
                            </h4>
                        </button>
                    </div>
                    <div className="container mx-auto">
                        <div
                            ref={containerRef}
                            id="work-items"
                            className="flex flex-wrap w-3/4 min-w-0 h-auto mx-auto"
                        >
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Web Developing", "SEO"]'
                                onClick={() => {
                                    handleWorkItemOnClick();
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/1.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Web Developing", "SEO"]'
                                onClick={() => {
                                    handleWorkItemOnClick({
                                        imgUrl: '/images/works/2.png',
                                        title: 'Antelope Canyon',
                                        description: `It is a long established fact that a reader will be distracted by the
                            readable content of a page when looking at its layout. The point of using
                            Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
                            opposed to using 'Content here, content here', making it look like readable
                            English`,
                                        client: 'Cheetah Academy',
                                        Completed: 'December 29 2022',
                                        skill: 'HTML, CSS, Javascript TS',
                                        project_link: '#2',
                                    });
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/2.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["SEO", "Video"]'
                                onClick={() => {
                                    handleWorkItemOnClick();
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/3.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["SEO"]'
                                onClick={() => {
                                    handleWorkItemOnClick();
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/4.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Web Developing"]'
                                onClick={() => {
                                    handleWorkItemOnClick();
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/5.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Video", "SEO"]'
                                onClick={() => {
                                    handleWorkItemOnClick();
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/6.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Video", "SEO"]'
                                onClick={() => {
                                    handleWorkItemOnClick();
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/7.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Web Developing"]'
                                onClick={() => {
                                    handleWorkItemOnClick();
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/8.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 js-item"
                                data-groups='["Web Developing"]'
                                onClick={() => {
                                    handleWorkItemOnClick();
                                }}
                            >
                                <div className="work-item-wrap">
                                    <Image
                                        src="/images/works/9.png"
                                        alt="work"
                                        width={1053}
                                        height={817}
                                        className="w-full opacity-50 cursor-pointer rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <WorksDialog
                    workDialogIsOpen={workDialogIsOpen}
                    workInfo={workDialogInfo || undefined}
                    onOpenStatusChange={(isOpen: boolean) => {
                        setWorkDialogIsOpen(isOpen);
                    }}
                />
                <section
                    id="testimonial"
                    className={`${
                        currentSection === '#testimonial' ? 'block' : 'hidden'
                    } pt-[64px] bg-none md:bg-[url('/images/bg-shape-light.png')] md:dark:bg-[url('/images/bg-shape.png')] bg-no-repeat bg-[60vw_374px] min-h-screen`}
                >
                    <div className="text-center">
                        <header className="header-has-bg ">
                            <Image
                                src="/images/h1-bg-light.png"
                                alt="h1 bg"
                                width={166}
                                height={75}
                                className="dark:hidden"
                            />
                            <Image
                                src="/images/h1-bg.png"
                                alt="h1 bg"
                                width={166}
                                height={75}
                                className="hidden dark:block"
                            />
                            <h1>My Blog</h1>
                        </header>
                    </div>
                </section>
                <section
                    id="contact"
                    className={`${
                        currentSection === '#contact_me' ? 'block' : 'hidden'
                    } pt-[65px] bg-none md:bg-[url('/images/bg-shape-light.png')] md:dark:bg-[url('/images/bg-shape.png')] bg-no-repeat bg-[53vw_574px] min-h-screen`}
                >
                    <div className="text-center">
                        <header className="header-has-bg ">
                            <Image
                                src="/images/h1-bg-light.png"
                                alt="h1 bg"
                                width={166}
                                height={75}
                                className="dark:hidden"
                            />
                            <Image
                                src="/images/h1-bg.png"
                                alt="h1 bg"
                                width={166}
                                height={75}
                                className="hidden dark:block"
                            />
                            <h1>Contact Me</h1>
                        </header>
                    </div>
                    <div className="relative container mx-auto z-20 flex items-center justify-center flex-col mt-[123px]">
                        <div className="flex flex-wrap w-3/4 min-w-0 h-auto">
                            <div className="w-full lg:w-1/2 pr-3 xl:pr-[69px]">
                                <ContactForm />
                            </div>
                            <div className="w-full lg:w-1/2 pl-3 xl:pl-[69px] lg:mt-0 mt-20">
                                <div className="flex mb-8 group flex-col md:flex-row text-center justify-center items-center md:justify-start md:items-start md:text-left">
                                    <div className="flex justify-center items-center min-w-[46px] min-h-[46px]  w-[46px] h-[46px] p-[14px] transition-all duration-[0.3s] md:mr-4 rounded-[50%] bg-secondary_gray_light dark:bg-[#ffffff0d] group-hover:bg-primary mr-0 mb-2 md:mb-0">
                                        <BsTelephone className="text-lg group-hover:fill-white" />
                                    </div>
                                    <div className="text">
                                        <span className="text-gray_light dark:text-gray">
                                            Phone number:
                                        </span>
                                        <a
                                            href="tel:+1234567890"
                                            className="block text-paragraph_light dark:text-white no-underline"
                                        >
                                            044 20 7946 0499 - 044 20 7946 0135
                                        </a>
                                    </div>
                                </div>
                                <div className="flex mb-8 group flex-col md:flex-row text-center justify-center items-center md:justify-start md:items-start md:text-left">
                                    <div className="flex justify-center items-center min-w-[46px] min-h-[46px]  w-[46px] h-[46px] p-[14px] transition-all duration-[0.3s] md:mr-4 rounded-[50%] bg-secondary_gray_light dark:bg-[#ffffff0d] group-hover:bg-primary mr-0 mb-2 md:mb-0">
                                        <BsEnvelope className="text-lg group-hover:fill-white" />
                                    </div>
                                    <div className="text">
                                        <span className="text-gray_light dark:text-gray">
                                            Email:
                                        </span>
                                        <a
                                            href="mailto:cheetah.academy.sp@gmail.com"
                                            className="block text-paragraph_light dark:text-white no-underline"
                                        >
                                            cheetah.academy.sp@gmail.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex mb-8 group flex-col md:flex-row text-center justify-center items-center md:justify-start md:items-start md:text-left">
                                    <div className="flex justify-center items-center min-w-[46px] min-h-[46px]  w-[46px] h-[46px] p-[14px] transition-all duration-[0.3s] md:mr-4 rounded-[50%] bg-secondary_gray_light dark:bg-[#ffffff0d] group-hover:bg-primary mr-0 mb-2 md:mb-0">
                                        <LiaMapMarkerSolid className="text-lg group-hover:fill-white" />
                                    </div>
                                    <div className="text">
                                        <span className="text-gray_light dark:text-gray">
                                            Location:
                                        </span>
                                        <p>
                                            989 Springfield Road London EC49 3OE
                                            <br /> United kingdom 3466e.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};
export default PortfolioClient;
