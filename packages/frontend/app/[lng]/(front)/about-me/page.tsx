import { PortfolioSidebar } from '@frontend/components/common/PortfolioSidebar';
import { NextPage } from 'next';
import Image from 'next/image';

interface Props {
    params: {
        lng: string;
    };
}

const PortfolioAboutMe: NextPage<Props> = async ({ params }) => {
    return (
        <>
            <PortfolioSidebar activeItem="/about-me" lng={params.lng} />
            <main className="pl-0 pt-[50px] md:pl-[102px] md:pt-0 ">
                <section id="about_me" className="block md:pt-[64px]">
                    <div className="relative container mx-auto z-20 flex items-center justify-center flex-col">
                        <div className="flex flex-wrap w-3/4 min-w-0 h-auto">
                            <div className="w-full lg:w-1/3 2xl:w-1/2 flex items-start ">
                                <Image
                                    src="/images/person-about.jpg"
                                    alt="person about"
                                    className="transition-all duration-[0.3s] rounded-[8px] hover:scale-105"
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
                                        href="/"
                                        className="btn-custom-base bg-secondary_gray_light dark:bg-secondary-dark text-paragraph_light dark:text-primary  w-full md:w-auto text-center"
                                        // TODO href onClick={() => handleChangeSectionClick('#contact_me')}
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
            </main>
        </>
    );
};
export default PortfolioAboutMe;
