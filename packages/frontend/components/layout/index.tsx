import { FC, ReactNode } from 'react';

// import AdminLayout from './AdminLayout';
import DefaultLayout from './DefaultLayout';

interface Props {
    children: ReactNode;
    title?: string;
    desc?: string;
}

const Layout: FC<Props> = ({ children, title, desc }): JSX.Element => {
    // const { data } = useSession();
    // const profile = (data?.user || {}) as any;

    // if (profile.role === 'admin') return <AdminLayout title={title}>{children}</AdminLayout>;

    return <DefaultLayout>{children}</DefaultLayout>;
};

export default Layout;
