import { PortfolioSidebar } from '@frontend/components/common/PortfolioSidebar';
import { NextPage } from 'next';
import Image from 'next/image';

import { AiFillWechat } from 'react-icons/ai';
import { LiaMapMarkerSolid } from 'react-icons/lia';
import { BsEnvelope } from 'react-icons/bs';
import ContactForm from '@frontend/components/common/contactForm';
import { useTranslation } from '@frontend/app/i18n';
import { WeChatWrap } from '@frontend/components/common/WeChatIcon';

interface Props {
    params: {
        lng: string;
    };
}

const PortfolioContactMe: NextPage<Props> = async ({ params }) => {
    const { t } = await useTranslation(params.lng, 'contact-me-page');
    return (
        <>
            <PortfolioSidebar activeItem="/contact-me" lng={params.lng} />
            <main className="pl-0 pt-[50px] md:pl-[102px] md:pt-0 ">
                <section
                    id="contact"
                    className={`block pt-[65px] bg-none md:bg-[url('/images/bg-shape-light.png')] md:dark:bg-[url('/images/bg-shape.png')] bg-no-repeat bg-[53vw_574px] min-h-screen`}
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
                            <h1>{t('contact-me')}</h1>
                        </header>
                    </div>
                    <div className="relative container mx-auto z-20 flex items-center justify-center flex-col mt-[123px]">
                        <div className="flex flex-wrap w-3/4 min-w-0 h-auto">
                            <div className="w-full lg:w-1/2 pr-3 xl:pr-[69px]">
                                <ContactForm lng={params.lng} />
                            </div>
                            <div className="w-full lg:w-1/2 pl-3 xl:pl-[69px] lg:mt-0 mt-20">
                                <WeChatWrap>
                                    <div className="flex mb-8 group flex-col md:flex-row text-center justify-center items-center md:justify-start md:items-start md:text-left">
                                        <div className="flex justify-center items-center min-w-[46px] min-h-[46px]  w-[46px] h-[46px] p-[14px] transition-all duration-[0.3s] md:mr-4 rounded-[50%] bg-secondary_gray_light dark:bg-[#ffffff0d] group-hover:bg-primary mr-0 mb-2 md:mb-0">
                                            <AiFillWechat className="text-lg group-hover:fill-white" />
                                        </div>
                                        <div className="text">
                                            <span className="text-gray_light dark:text-gray">
                                                {t('weChat')}
                                            </span>
                                            <a
                                                href="#"
                                                className="block text-paragraph_light dark:text-white no-underline"
                                            >
                                                ksdaylight
                                            </a>
                                        </div>
                                    </div>
                                </WeChatWrap>
                                <div className="flex mb-8 group flex-col md:flex-row text-center justify-center items-center md:justify-start md:items-start md:text-left">
                                    <div className="flex justify-center items-center min-w-[46px] min-h-[46px]  w-[46px] h-[46px] p-[14px] transition-all duration-[0.3s] md:mr-4 rounded-[50%] bg-secondary_gray_light dark:bg-[#ffffff0d] group-hover:bg-primary mr-0 mb-2 md:mb-0">
                                        <BsEnvelope className="text-lg group-hover:fill-white" />
                                    </div>
                                    <div className="text">
                                        <span className="text-gray_light dark:text-gray">
                                            Email:
                                        </span>
                                        <a
                                            href="mailto:ksmiloyuan@gmail.com"
                                            className="block text-paragraph_light dark:text-white no-underline"
                                        >
                                            ksmiloyuan@gmail.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex mb-8 group flex-col md:flex-row text-center justify-center items-center md:justify-start md:items-start md:text-left">
                                    <div className="flex justify-center items-center min-w-[46px] min-h-[46px]  w-[46px] h-[46px] p-[14px] transition-all duration-[0.3s] md:mr-4 rounded-[50%] bg-secondary_gray_light dark:bg-[#ffffff0d] group-hover:bg-primary mr-0 mb-2 md:mb-0">
                                        <LiaMapMarkerSolid className="text-lg group-hover:fill-white" />
                                    </div>
                                    <div className="text">
                                        <span className="text-gray_light dark:text-gray">
                                            {t('location-title')}
                                        </span>
                                        <p>{t('location')}</p>
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
export default PortfolioContactMe;
