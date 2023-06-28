import { NextPage } from 'next';

import AdminLayout from '../../../../components/layout/AdminLayout';
import Editor from '../../../../components/Editor';

interface Props {}

interface Props {}

const Create: NextPage<Props> = () => {
    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <Editor />
            </div>
        </AdminLayout>
    );
};

export default Create;
