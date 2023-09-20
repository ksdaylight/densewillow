import { NextPage } from 'next';
import { AiOutlineHome, AiOutlineIdcard, AiOutlineFile } from 'react-icons/ai';
import { BsBriefcase, BsTelephone } from 'react-icons/bs';
import { LiaCommentAltSolid } from 'react-icons/lia';
import Image from 'next/image';

import Link from 'next/link';

interface Props {}

const Portfolio: NextPage<Props> = async () => {
    return (
        <>
            <div id="sidebar" className="bg-rose-400">
                <Image src="/images/logo.png" alt="logo" width={120} height={120} />
                <nav>
                    <nav>
                        <ul>
                            <li>
                                <Link href="#home">
                                    <AiOutlineHome className="w-10 h-10" />
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="#about_me">
                                    <AiOutlineIdcard className="w-10 h-10" />
                                </Link>
                                <span>About Me</span>
                            </li>
                            <li>
                                <Link href="#my_resume">
                                    <AiOutlineFile className="w-10 h-10" />
                                </Link>
                                <span>My Resume</span>
                            </li>
                            <li>
                                <Link href="#my_work">
                                    <BsBriefcase className="w-10 h-10" />
                                </Link>
                                <span>My Work</span>
                            </li>
                            <li>
                                <Link href="#testimonial">
                                    <LiaCommentAltSolid className="w-10 h-10" />
                                </Link>
                                <span>Testimonial</span>
                            </li>
                            <li>
                                <Link href="#contact_me">
                                    <BsTelephone className="w-10 h-10" />
                                </Link>
                                <span>Contact Me</span>
                            </li>
                        </ul>
                    </nav>
                    <div className="toggle-mode">
                        <div className="outer">
                            <div className="inner" />
                        </div>
                    </div>
                </nav>
            </div>
            <main>
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
        </>
    );
};

export default Portfolio;
