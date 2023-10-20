import { NextPage } from 'next';

import AdminHome from './admin-page';

interface Props {}
const Admin: NextPage<Props> = () => {
    return <AdminHome />;
};
export default Admin;
