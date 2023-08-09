import { NextPage } from 'next';
// import { initQueryClient } from '@ts-rest/react-query';

// import { apiBlog } from '@api-contracts';

import AdminLayout from '../../components/layout/AdminLayout';

import AdminHome from './admin-page';

// export const baseApiUrl = 'http://192.168.80.6/api'; // TODO BaseUrl 替换策略
// export const apiClient = initQueryClient(apiBlog, {
//     baseUrl: 'http://192.168.80.6',
//     baseHeaders: {
//         Authorization: 'key',
//     }, // 类型需要匹配
//     credentials: 'include',
// });

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
