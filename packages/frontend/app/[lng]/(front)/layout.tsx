'use client';

import { Sidebar } from '@frontend/components/common/Siderbar';
import { useState } from 'react';

import WorksDialog from '@frontend/components/common/WorksDialog';

const navItems = [
    { href: '#home', icon: 'home', label: 'Home' },
    { href: '/about-me', icon: 'idCard', label: ' About Me' },
    { href: '#my_resume', icon: 'file', label: 'My Resume' },
    { href: '#my_work', icon: 'briefcase', label: 'My Work' },
    { href: '#testimonial', icon: 'comment', label: 'Testimonial' },
    { href: '#contact_me', icon: 'phone', label: 'Contact Me' },
];
interface FrontendLayoutProps {
    children: React.ReactNode;
}
const FrontendLayout = async ({ children }: FrontendLayoutProps) => {
    const [currentSection, setCurrentSection] = useState<string | null>('#home');
    const [workDialogIsOpen, setWorkDialogIsOpen] = useState(false);
    // const [workDialogInfo, setWorkDialogInfo] = useState<WorkInfo | null>(null);

    const handleSectionChange = (sectionId: string) => {
        setCurrentSection(sectionId);
    };

    return (
        <div className="min-h-scree">
            <Sidebar
                navItems={navItems}
                onSectionChange={handleSectionChange}
                activeItem={currentSection}
                className={`${workDialogIsOpen ? 'blur-sm' : 'blur-none'}`}
            />
            <main className="pl-0 pt-[50px] md:pl-[102px] md:pt-0 ">
                {children}
                <WorksDialog
                    workDialogIsOpen={workDialogIsOpen}
                    // workInfo={workDialogInfo || undefined}
                    onOpenStatusChange={(isOpen: boolean) => {
                        setWorkDialogIsOpen(isOpen);
                    }}
                />
            </main>
        </div>
    );
};

export default FrontendLayout;
