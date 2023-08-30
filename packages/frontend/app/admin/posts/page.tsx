import { NextPage } from 'next';

import AdminLayout from '../../../components/layout/AdminLayout';

import PostAdmin from './post-page';

interface Props {}

const Posts: NextPage<Props> = async () => {
    return (
        <AdminLayout>
            <PostAdmin />
        </AdminLayout>
    );
};

export default Posts;
