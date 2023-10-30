import { PortfolioSidebar } from '@frontend/components/common/PortfolioSidebar';
import { NextPage } from 'next';
import Image from 'next/image';

import { LiaUniversitySolid } from 'react-icons/lia';
import { BsBriefcase } from 'react-icons/bs';
import { useTranslation } from '@frontend/app/i18n';

interface Props {
    params: {
        lng: string;
    };
}

const PortfolioMyResume: NextPage<Props> = async ({ params }) => {
    const { t } = await useTranslation(params.lng, 'my-resume-page');
    return (
        <>
            <PortfolioSidebar activeItem="/my-resume" lng={params.lng} />
            <main className="pl-0 pt-[50px] md:pl-[102px] md:pt-0 ">
                <section
                    id="resume"
                    className={`block pt-[64px] pb-[115px] bg-none md:bg-[url('/images/bg-shape-light.png')] md:dark:bg-[url('/images/bg-shape.png')] bg-no-repeat bg-[40vw_374px]`}
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
                            <h1>{t('my-resume')}</h1>
                        </header>
                        <div className="relative flex items-center justify-center z-20">
                            <div className="flex flex-wrap w-3/4 min-w-0 h-auto">
                                <div
                                    id="education"
                                    className="w-full xl:w-1/2 flex flex-col md:pr-[34px] px-3"
                                >
                                    <header className="header-custom mb-[42px]">
                                        <h2>{t('education-experience')}</h2>
                                    </header>
                                    <div className="items">
                                        <div className="flex mb-[42px] group relative md:static">
                                            <div className="resume-item-icon">
                                                <LiaUniversitySolid className="fill-primary" />
                                            </div>
                                            <div className="resume-item-box">
                                                <span className="inline-block text-lg font-normal mb-4">
                                                    2015 - 2019
                                                </span>
                                                <h2 className="text-primary mb-4">
                                                    {t('university-title')}
                                                </h2>
                                                <p className="text-lg font-normal text-gray_light dark:text-gray ">
                                                    {t('university')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex group relative md:static">
                                            <div className="resume-item-icon">
                                                <LiaUniversitySolid className="las la-university" />
                                            </div>
                                            <div className="resume-item-box">
                                                <span className="inline-block text-lg font-normal mb-4">
                                                    2012 - 2015
                                                </span>
                                                <h2 className="mb-4">{t('high-school-title')}</h2>
                                                <p className="text-lg font-normal text-gray_light dark:text-gray ">
                                                    {t('high-school')}
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
                                        <h2>{t('work-experience')}</h2>
                                    </header>
                                    <div className="items">
                                        <div className="flex mb-[42px] group relative md:static">
                                            <div className="resume-item-icon">
                                                <BsBriefcase className="fill-primary" />
                                            </div>
                                            <div className="resume-item-box">
                                                <span className="inline-block text-lg font-normal mb-4">
                                                    {t('to-present')}
                                                </span>
                                                <h2 className="text-primary mb-4">
                                                    {t('mid-Level-title')}
                                                </h2>
                                                <p className="text-lg font-normal text-gray_light dark:text-gray ">
                                                    {t('mid-Level')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex mb-[42px] group relative md:static">
                                            <div className="resume-item-icon">
                                                <BsBriefcase className="las la-briefcase" />
                                            </div>
                                            <div className="resume-item-box">
                                                <span className="inline-block text-lg font-normal mb-4">
                                                    2019 - 2021
                                                </span>
                                                <h2 className="mb-4">{t('junior-web-title')}</h2>
                                                <p className="text-lg font-normal text-gray_light dark:text-gray ">
                                                    {t('junior-web')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex group relative md:static">
                                            <div className="resume-item-icon">
                                                <BsBriefcase className="las la-briefcase" />
                                            </div>
                                            <div className="resume-item-box">
                                                <span className="year">2018 - 2019</span>
                                                <h2 className="mb-4">{t('trainee-title')}</h2>
                                                <p className="text-lg font-normal text-gray_light dark:text-gray ">
                                                    {t('trainee')}
                                                </p>
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
export default PortfolioMyResume;
