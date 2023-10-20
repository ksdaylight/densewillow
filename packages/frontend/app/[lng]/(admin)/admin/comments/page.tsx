import { NextPage } from 'next';

import Comments from '@frontend/components/common/Comments';

interface Props {}

const AdminComments: NextPage<Props> = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl dark:text-white text-primary-dark font-semibold py-2 transition">
                Comments
            </h1>
            <Comments fetchAll />
        </div>
    );
};

export default AdminComments;
