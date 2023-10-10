import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { FaLinkedinIn } from 'react-icons/fa';
import { BiLogoStackOverflow } from 'react-icons/bi';
import { AiFillGithub } from 'react-icons/ai';
import { random } from 'lodash';
import TypedH2 from '@frontend/components/common/TypedH2';

interface Props {}

const PortfolioHome: NextPage<Props> = async () => {
    return (
        <section
            className={`block bg-none md:bg-[url('/images/bg-shape-light.png')] md:dark:bg-[url('/images/bg-shape.png')] bg-no-repeat bg-[40vw_-24px]`}
        >
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
                                <TypedH2
                                    initialText="Front-End web developer"
                                    className="text-gray_light dark:text-gray mr-[2px]"
                                />
                                {/* <h2
                                    ref={typedEl}
                                    className="text-gray_light dark:text-gray mr-[2px]"
                                >
                                    Front-End web developer
                                </h2> */}
                            </div>
                            <p className="max-w-[430px] mb-[74px]">
                                I design and develop services for customers of all sizes,
                                specializing in creating stylish, modern websites, web services, and
                                online stores.
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
    );
};
export default PortfolioHome;
