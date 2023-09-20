import { NextPage } from 'next';
import { AiOutlineHome, AiOutlineIdcard, AiOutlineFile } from 'react-icons/ai';
import { BsBriefcase, BsTelephone } from 'react-icons/bs';
import { LiaCommentAltSolid } from 'react-icons/lia';
import Image from 'next/image';

import Link from 'next/link';

interface Props {}

const Portfolio: NextPage<Props> = async () => {
    return (
        <div className="min-h-screen bg-dark_bg ">
            <div id="sidebar" className="fixed h-screen px-[39px] flex flex-col">
                <div id="logo" className="h-1/5 text-center pt-[62px]">
                    <Image src="/images/logo.png" alt="DenseWillow" width={23} height={30} />
                </div>
                <nav className=" h-3/5 flex items-center justify-center">
                    <ul className="m-0 p-0 list-none">
                        <li className="relative mb-[35px] group">
                            <Link href="#home">
                                <AiOutlineHome className="text-gray text-[18px] group-hover:text-white" />
                            </Link>
                            <span className="absolute whitespace-nowrap top-[-8px] left-5 py-[7px] px-[13px] bg-secondary-dark/75 rounded-[6px] opacity-0 group-hover:opacity-100 group-hover:left-[30px] transition-all duration-300">
                                Home
                            </span>
                        </li>
                        <li className="relative mb-[35px] group">
                            <Link href="#about_me">
                                <AiOutlineIdcard className="text-gray text-[18px] group-hover:text-white" />
                            </Link>
                            <span className="absolute whitespace-nowrap top-[-8px] left-5 py-[7px] px-[13px] bg-secondary-dark/75 rounded-[6px] opacity-0 group-hover:opacity-100 group-hover:left-[30px] transition-all duration-300">
                                About Me
                            </span>
                        </li>
                        <li className="relative mb-[35px] group">
                            <Link href="#my_resume">
                                <AiOutlineFile className="text-gray text-[18px] group-hover:text-white" />
                            </Link>
                            <span className="absolute whitespace-nowrap top-[-8px] left-5 py-[7px] px-[13px] bg-secondary-dark/75 rounded-[6px] opacity-0 group-hover:opacity-100 group-hover:left-[30px] transition-all duration-300">
                                My Resume
                            </span>
                        </li>
                        <li className="relative mb-[35px] group">
                            <Link href="#my_work">
                                <BsBriefcase className="text-gray text-[18px] group-hover:text-white" />
                            </Link>
                            <span className="absolute whitespace-nowrap top-[-8px] left-5 py-[7px] px-[13px] bg-secondary-dark/75 rounded-[6px] opacity-0 group-hover:opacity-100 group-hover:left-[30px] transition-all duration-300">
                                My Work
                            </span>
                        </li>
                        <li className="relative mb-[35px] group">
                            <Link href="#testimonial">
                                <LiaCommentAltSolid className="text-gray text-[18px] group-hover:text-white" />
                            </Link>
                            <span className="absolute whitespace-nowrap top-[-8px] left-5 py-[7px] px-[13px] bg-secondary-dark/75 rounded-[6px] opacity-0 group-hover:opacity-100 group-hover:left-[30px] transition-all duration-300">
                                Testimonial
                            </span>
                        </li>
                        <li className="relative mb-[35px] group">
                            <Link href="#contact_me">
                                <BsTelephone className="text-gray text-[18px] group-hover:text-white" />
                            </Link>
                            <span className="absolute whitespace-nowrap top-[-8px] left-5 py-[7px] px-[13px] bg-secondary-dark/75 rounded-[6px] opacity-0 group-hover:opacity-100 group-hover:left-[30px] transition-all duration-300">
                                Contact Me
                            </span>
                        </li>
                        {/* change to components */}
                    </ul>
                </nav>
                <div id="toggle-mode" className="h-1/5 flex items-end pb-[62px]">
                    <div id="outer" className="w-6 h-[35px] rounded-3xl bg-[#1e1e20]">
                        <div
                            id="inner"
                            className='relative w-3.5 h-3.5 mt-4 mx-auto rounded-[50%] bg-[#658df2]  before:absolute before:content-[""] before:w-3.5 before:h-3.5 before:rounded-[50%] before:left-[3px] before:-top-1 before:bg-[#1e1e20]'
                        />
                    </div>
                </div>
            </div>
            <main className="pl-[102px]">
                <section className="bg-[#666]">Home</section>
                <section id="about" className="">
                    About
                </section>
                <section id="resume">Resume</section>
                <section id="work" className="background: #f00">
                    Work
                </section>
                <section id="testimonial">Testimonial</section>
                <section id="contact" className="background: #000">
                    Contact
                </section>
                <p className="inline-block text-5xl bg-[#a0a0aa] w-[400px] border-[20px] border-red-500 ">
                    Test text
                </p>
                <h1>Cheetah Academy</h1>
                <h2>Cheetah Academy</h2>
                <p className="text-3xl">Paragraph</p>
            </main>
        </div>
    );
};

export default Portfolio;
