import Link from 'next/link';
import { FC, ReactNode } from 'react';
import {
    AiOutlineDashboard,
    AiOutlineContainer,
    AiOutlineTeam,
    AiOutlineMail,
    AiOutlineContacts,
    AiOutlineFileAdd,
} from 'react-icons/ai';

import AdminNav from '../common/nav/AdminNav';
import AppHead from '../common/AppHead';

interface Props {
    children: ReactNode;
    title?: string;
}

const navItems = [
    { href: '/admin', icon: AiOutlineDashboard, label: 'Dashboard' },
    { href: '/admin/posts', icon: AiOutlineContainer, label: 'Posts' },
    { href: '/admin/users', icon: AiOutlineTeam, label: 'Users' },
    { href: '/admin/comments', icon: AiOutlineMail, label: 'Comments' },
    { href: '/admin/contact', icon: AiOutlineContacts, label: 'Contact' },
];

const AdminLayout: FC<Props> = ({ title, children }): JSX.Element => {
    return (
        <>
            <AppHead title={title} />
            <div className="flex ">
                <AdminNav navItems={navItems} />
                <div className="flex-1 p-4">{children}</div>
                {/* create button */}
                <Link href="/admin/posts/create">
                    <a className="bg-secondary-dark dark:bg-secondary-light text-primary dark:text-primary-dark fixed z-10 right-10 bottom-10 p-3 rounded-full hover:scale-90 shadow-sm transition">
                        <AiOutlineFileAdd size={24} />
                    </a>
                </Link>
            </div>
        </>
    );
};

export default AdminLayout;
