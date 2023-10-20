import { NextPage } from 'next';

import AdminUser from './users-page';

interface Props {}

const Users: NextPage<Props> = () => {
    return <AdminUser />;
};

export default Users;
