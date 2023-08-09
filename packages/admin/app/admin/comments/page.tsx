import { NextPage } from 'next';

import Comments from '../../../components/common/Comments';
import AdminLayout from '../../../components/layout/AdminLayout';

interface Props {}

const AdminComments: NextPage<Props> = () => {
    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl dark:text-primary text-primary-dark font-semibold py-2 transition">
                    Comments
                </h1>
                <Comments fetchAll />
            </div>
        </AdminLayout>
    );
};

export default AdminComments;
// TODO
