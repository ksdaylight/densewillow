import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { AiOutlineFileAdd } from 'react-icons/ai';

import AdminNav from '../common/AdminNav';
import AppHead from '../common/AppHead';

interface Props {
    children: ReactNode;
    title?: string;
}

const navItems = [
    { href: '/admin', icon: 'dashboard', label: 'Dashboard' },
    { href: '/admin/posts', icon: 'container', label: 'Posts' },
    { href: '/admin/users', icon: 'team', label: 'Users' },
    { href: '/admin/comments', icon: 'mail', label: 'Comments' },
    { href: '/admin/contact', icon: 'contacts', label: 'Contact' },
];
const AdminLayout: FC<Props> = ({ title, children }): JSX.Element => {
    return (
        <>
            <AppHead title={title} />
            <div className="flex ">
                <AdminNav navItems={navItems} />
                <div className="flex-1 p-4">{children}</div>
                {/* create button */}
                <Link
                    href="/admin/posts/create"
                    className="bg-secondary-dark dark:bg-secondary-light text-primary dark:text-primary-dark fixed z-10 right-10 bottom-10 p-3 rounded-full hover:scale-90 shadow-sm transition"
                >
                    <AiOutlineFileAdd size={24} />
                </Link>
            </div>
        </>
    );
};

export default AdminLayout;
