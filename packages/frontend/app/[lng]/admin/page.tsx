import { NextPage } from 'next';

import AdminLayout from '../../../components/layout/AdminLayout';

import AdminHome from './admin-page';

interface Props {}
const Admin: NextPage<Props> = () => {
    return (
        <div>
            <AdminLayout>
                <AdminHome />
            </AdminLayout>
        </div>
    );
};
export default Admin;
