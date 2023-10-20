import AdminNav from '@frontend/components/common/nav/AdminNav';
import AdminSecondaryNav from '@frontend/components/common/nav/AdminSecondaryNav';
import Link from 'next/link';
import { AiOutlineFileAdd } from 'react-icons/ai';

interface AdminLayoutProps {
    children: React.ReactNode;
}
const navItems = [
    { href: '/admin', icon: 'dashboard', label: 'Dashboard' },
    { href: '/admin/posts', icon: 'container', label: 'Posts' },
    { href: '/admin/users', icon: 'team', label: 'Users' },
    { href: '/admin/comments', icon: 'mail', label: 'Comments' },
    // { href: '/admin/contact', icon: 'contacts', label: 'Contact' },
];
const AdminLayout = async ({ children }: AdminLayoutProps) => {
    return (
        <div className="flex ">
            <AdminNav navItems={navItems} />
            <div className="flex-1 p-4 dark:bg-primary-dark bg-white">
                <AdminSecondaryNav />
                {children}
            </div>
            {/* create button */}
            <Link
                href="/admin/posts/create"
                className="bg-secondary-gray dark:bg-secondary-light text-white dark:text-primary-dark fixed z-10 right-10 bottom-10 p-3 rounded-full hover:scale-90 shadow-sm transition"
            >
                <AiOutlineFileAdd size={24} />
            </Link>
        </div>
    );
};

export default AdminLayout;
