'use client';

import { Sidebar } from '@frontend/components/common/Siderbar';
import { FC, useState } from 'react';

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
    const handleSectionChange = (sectionId: string) => {
        setCurrentSection(sectionId);
    };
    return (
        <div className="min-h-screen bg-dark_bg ">
            <Sidebar navItems={navItems} onSectionChange={handleSectionChange} />
            <main className="pl-[102px]">
                <section className={`bg-[#666] ${currentSection === '#home' ? 'block' : 'hidden'}`}>
                    Home
                </section>
                <section
                    id="about"
                    className={`bg-[#666] ${currentSection === '#about_me' ? 'block' : 'hidden'}`}
                >
                    About
                </section>
                <section
                    id="resume"
                    className={`bg-[#666] ${currentSection === '#my_resume' ? 'block' : 'hidden'}`}
                >
                    Resume
                </section>
                <section
                    id="work"
                    className={`bg-[#666] ${currentSection === '#my_work' ? 'block' : 'hidden'}`}
                >
                    Work
                </section>
                <section
                    id="testimonial"
                    className={`bg-[#666] ${
                        currentSection === '#testimonial' ? 'block' : 'hidden'
                    }`}
                >
                    Testimonial
                </section>
                <section
                    id="contact"
                    className={`bg-[#666] ${currentSection === '#contact_me' ? 'block' : 'hidden'}`}
                >
                    Contact
                </section>
                {/* <p className="inline-block text-5xl bg-[#a0a0aa] w-[400px] border-[20px] border-red-500 ">
                    Test text
                </p>
                <h1>Cheetah Academy</h1>
                <h2>Cheetah Academy</h2>
                <p className="text-3xl">Paragraph</p> */}
            </main>
        </div>
    );
};
export default PortfolioClient;
