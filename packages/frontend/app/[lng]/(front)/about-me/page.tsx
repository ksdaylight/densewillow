import { useTranslation } from '@frontend/app/i18n';
import { PortfolioSidebar } from '@frontend/components/common/PortfolioSidebar';
import { NextPage } from 'next';
import Image from 'next/image';

interface Props {
    params: {
        lng: string;
    };
}

const PortfolioAboutMe: NextPage<Props> = async ({ params }) => {
    const { t } = await useTranslation(params.lng, 'about-me-page');
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
                                    <h1>{t('about-me')}</h1>
                                </header>
                                <h2 className="text-gray_light dark:text-gray mb-[16px]">
                                    {t('main-introduction')}
                                </h2>
                                <p className="max-w-[560px] text-paragraph_light dark:text-gray">
                                    {t('detail-introduction')}
                                </p>
                                <div id="about_items">
                                    <div className="container">
                                        <div className="w-full flex flex-col md:flex-row">
                                            <div className="w-full md:w-1/2 mt-[30px] md:mb-[48px]">
                                                <div className="flex mb-[16px]">
                                                    <span className="title">{t('name-title')}</span>
                                                    <span className="text-gray_light dark:text-gray ml-[4px]">
                                                        {t('name')}
                                                    </span>
                                                </div>
                                                <div className="flex mb-[16px]">
                                                    <span className="title">{t('age-title')}</span>
                                                    <span className="text-gray_light dark:text-gray  ml-[4px]">
                                                        {t('age')}
                                                    </span>
                                                </div>
                                                <div className="flex mb-[16px]">
                                                    <span className="title">
                                                        {t('location-title')}
                                                    </span>
                                                    <span className="text-gray_light dark:text-gray ml-[4px]">
                                                        {t('location')}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="w-full md:w-1/2 md:mt-[30px] mb-[48px]">
                                                <div className="flex mb-[16px]">
                                                    <span className="title">
                                                        {t('y-o-e-title')}
                                                    </span>
                                                    <span className="text-gray_light dark:text-gray ml-[4px]">
                                                        {t('y-o-e')}
                                                    </span>
                                                </div>
                                                <div className="flex mb-[16px]">
                                                    <span className="title">
                                                        {t('WeChat-title')}
                                                    </span>
                                                    <span className="text-gray_light dark:text-gray ml-[4px]">
                                                        {t('WeChat')}
                                                    </span>
                                                </div>
                                                <div className="flex mb-[16px]">
                                                    <span className="title whitespace-nowrap">
                                                        {t('e-mail-title')}
                                                    </span>
                                                    <span className="text-gray_light dark:text-gray ml-[4px]">
                                                        {t('e-mail')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap flex-col md:flex-row">
                                    <a
                                        href="/contact-me"
                                        className="btn-custom-base bg-[#E9EFFF] dark:bg-[#262f48] text-primary mr-[24px] mb-[16px] md:mb-0 w-full md:w-auto text-center"
                                        download=""
                                    >
                                        {t('contact-me')}
                                    </a>
                                    {/* <a
                                        href="/contact-me"
                                        className="btn-custom-base bg-secondary_gray_light dark:bg-secondary-dark text-paragraph_light dark:text-primary  w-full md:w-auto text-center"
                                        // href onClick={() => handleChangeSectionClick('#contact_me')}
                                    >
                                        Message me
                                    </a> */}
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
                                                <h3 className="mt-[4px]">{t('mandarin')}</h3>
                                                <span className="text-gray_light dark:text-gray">
                                                    {t('mandarin-level')}
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
                                                <h3>{t('english')}</h3>
                                                <span className="text-gray_light dark:text-gray">
                                                    {t('english-level')}
                                                </span>
                                            </div>
                                            <div className="flex">
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                                <span className="rate-span" />
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
                                        <li className="flex justify-between items-center mb-[32px]">
                                            <h3>Communication</h3>
                                            <div className="flex">
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                            </div>
                                        </li>
                                        <li className="flex justify-between items-center mb-[32px]">
                                            <h3>Cooperation</h3>
                                            <div className="flex">
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                                <span className="rate-span" />
                                            </div>
                                        </li>
                                        <li className="flex justify-between items-center">
                                            <h3>Availability</h3>
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
                                                    src="/images/web-skills/js.png"
                                                    alt="JavaScript"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">JavaScript</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    +5 years
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/typescript.png"
                                                    alt="TypeScript"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">TypeScript</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    +3 years
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/nodejs.png"
                                                    alt="jQuery"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">Node.js</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    +4 years
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/react.png"
                                                    alt="React"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">React</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    +4 years
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/nestjs.png"
                                                    alt="NestJS"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">NestJS</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    +2 years
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/tailwindcss.png"
                                                    alt="Tailwind CSS"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">Tailwind CSS</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    +2 years
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/express.png"
                                                    alt="Express"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">Express</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    +1 years
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/nextjs.png"
                                                    alt="Next.js"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">Next.js</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    +3 years
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
                                                    +1 years
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/nuxt.png"
                                                    alt="Nuxt"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">Nuxt</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    +1 years
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/docker.png"
                                                    alt="Docker"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">Docker</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    +3 years
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/git.png"
                                                    alt="Git"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">Git</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    +6 years
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/github.png"
                                                    alt="GitHub"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">GitHub</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    +5 years
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/mysql.png"
                                                    alt="MySQL"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">MySQL</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    +4 years
                                                </span>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-1/2 xl:w-1/3 px-4">
                                            <div className="web-skill">
                                                <Image
                                                    src="/images/web-skills/postgresql.png"
                                                    alt="PostgreSQL"
                                                    width={51}
                                                    height={51}
                                                    className="mb-[21px] mx-auto"
                                                />
                                                <h3 className="mb-2">PostgreSQL</h3>
                                                <span className="dark:text-[#FF9F76] text-gray_light">
                                                    +1 years
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
