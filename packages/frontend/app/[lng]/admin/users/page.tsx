import { NextPage } from 'next';

import AdminLayout from '../../../../components/layout/AdminLayout';

import AdminUser from './users-page';

interface Props {}

const Users: NextPage<Props> = () => {
    return (
        <AdminLayout>
            <AdminUser />
        </AdminLayout>
    );
};

export default Users;
