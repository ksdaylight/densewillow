import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { AiFillWechat, AiFillGithub } from 'react-icons/ai';
// import dynamic from 'next/dynamic';
import { random } from 'lodash';
// import TypedH2 from '@frontend/components/common/TypedH2';

import { TypedH2 } from '@frontend/components/common/TypedH2';
import { PortfolioSidebar } from '@frontend/components/common/PortfolioSidebar';
import { useTranslation } from '@frontend/app/i18n';
import { WeChatWrap } from '@frontend/components/common/WeChatIcon';

interface Props {
    params: {
        lng: string;
    };
}
// 使用 dynamic 函数进行动态导入 https://github.com/vercel/next.js/discussions/47316#discussioncomment-6365548

// const PortfolioSidebar = dynamic(async () => {
//     const { PortfolioSidebar: Component } = await import(
//         '@frontend/components/common/PortfolioSidebar'
//     );
//     return { default: Component };
// });

// const TypedH2 = dynamic(async () => {
//     const { TypedH2: Component } = await import('@frontend/components/common/TypedH2');
//     return { default: Component };
// });

// const WeChatWrap = dynamic(async () => {
//     const { WeChatWrap: Component } = await import('@frontend/components/common/WeChatIcon');
//     return { default: Component };
// });

const PortfolioHome: NextPage<Props> = async ({ params }) => {
    const { t } = await useTranslation(params.lng, 'home-page');
    return (
        <>
            <PortfolioSidebar activeItem="/" lng={params.lng} />
            <main className="pl-0 pt-[50px] md:pl-[102px] md:pt-0 ">
                <section
                    className="block"
                    // className={`block bg-none md:bg-[url('/images/bg-shape-light.png')] md:dark:bg-[url('/images/bg-shape.png')] bg-no-repeat bg-[40vw_-24px]`}
                >
                    <div className="absolute w-full h-screen overflow-hidden z-0">
                        <Image
                            src="/images/bg-shape-light.png"
                            alt="person circle"
                            width={1176}
                            height={730}
                            className="invisible md:visible md:dark:invisible absolute left-[40%] top-[-24px] max-w-none"
                        />
                        <Image
                            priority
                            src="/images/bg-shape.png"
                            alt="person circle"
                            width={1176}
                            height={730}
                            className="invisible md:invisible md:dark:visible absolute left-[40%] top-[-24px] max-w-none"
                        />
                    </div>

                    <div
                        id="meteor-shower"
                        className="absolute w-full h-screen overflow-hidden right-0 top-0 z-10"
                    >
                        {/* //top-[32px]这样的任意值不起效果 bug  */}
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
                                        priority
                                        src="/images/person-circle.png"
                                        alt="person circle"
                                        width={45}
                                        height={45}
                                        className="mb-[24px]"
                                    />
                                    <h1 className="mb-[24px]">
                                        <span className="text-gray_light dark:text-gray">
                                            {t('Im')}
                                        </span>
                                        {t('my-name')}
                                    </h1>
                                    <div className="flex  items-center mb-[16px]">
                                        <TypedH2
                                            initialText={t('web-full-stack')}
                                            typedStrings={[
                                                t('web-full-stack'),
                                                t('front-end'),
                                                t('back-end'),
                                                t('Ops'),
                                            ]}
                                            lng={params.lng}
                                            className="text-gray_light dark:text-gray mr-[2px]"
                                        />
                                    </div>
                                    <p className="max-w-[430px] mb-[74px]">{t('introduction')}</p>
                                    <a
                                        href="/contact-me"
                                        className="btn-custom-base bg-[#E9EFFF] dark:bg-[#262f48] text-primary"
                                    >
                                        {t('contact-me')}
                                    </a>
                                    <div className="socials mt-[70px] md:mt-[191px]">
                                        <ul className="flex m-0 p-0 list-none flex-wrap justify-between md:justify-start">
                                            {/* <li className="mr-[8px]">
                                                <Link
                                                    href="#"
                                                    className="flex items-center no-underline transition-all duration-[0.3s] px-[11px] py-[9px] hover:bg-secondary_gray_light dark:hover:bg-secondary-dark hover:rounded-[6px] group/link"
                                                >
                                                    <FaLinkedinIn className="text-[18px] fill-gray_light dark:fill-gray transition-all duration-[0.3s] mr-2 group-hover/link:fill-paragraph_light dark:group-hover/link:fill-white" />
                                                    <span className="text-gray_light dark:text-gray transition-all duration-[0.3s] group-hover/link:text-paragraph_light dark:group-hover/link:text-white">
                                                        Linkedin
                                                    </span>
                                                </Link>
                                            </li> */}

                                            <li className="mr-[8px]">
                                                <Link
                                                    prefetch={false}
                                                    href="https://github.com/ksdaylight"
                                                    className="flex items-center no-underline transition-all duration-[0.3s] px-[11px] py-[9px] hover:bg-secondary_gray_light dark:hover:bg-secondary-dark hover:rounded-[6px] group/link"
                                                >
                                                    <AiFillGithub className="text-[18px] fill-gray_light dark:fill-gray transition-all duration-[0.3s] mr-2 group-hover/link:fill-paragraph_light dark:group-hover/link:fill-white" />
                                                    <span className="text-gray_light dark:text-gray transition-all duration-[0.3s] group-hover/link:text-paragraph_light dark:group-hover/link:text-white">
                                                        Github
                                                    </span>
                                                </Link>
                                            </li>
                                            <li className="mr-[8px]">
                                                <WeChatWrap>
                                                    <Link
                                                        prefetch={false}
                                                        href="#"
                                                        className="flex items-center no-underline transition-all duration-[0.3s] px-[11px] py-[9px] hover:bg-secondary_gray_light dark:hover:bg-secondary-dark hover:rounded-[6px] group/link"
                                                    >
                                                        <AiFillWechat className="text-[18px] fill-gray_light dark:fill-gray transition-all duration-[0.3s] mr-2 group-hover/link:fill-paragraph_light dark:group-hover/link:fill-white" />
                                                        <span className="text-gray_light dark:text-gray transition-all duration-[0.3s] group-hover/link:text-paragraph_light dark:group-hover/link:text-white">
                                                            {t('weChat')}
                                                        </span>
                                                    </Link>
                                                </WeChatWrap>
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
            </main>
        </>
    );
};
export default PortfolioHome;
