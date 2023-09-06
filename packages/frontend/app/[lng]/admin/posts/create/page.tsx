import { NextPage } from 'next';

import { dehydrate } from '@tanstack/query-core';

import AdminLayout from '@frontend/components/layout/AdminLayout';
import Editor from '@frontend/components/Editor';

import getQueryClient from '@frontend/utils/getQueryClient';
import Hydrate from '@frontend/utils/hydrate.client';

interface Props {}

interface Props {}
async function getImages() {
    const res = await fetch('http://127.0.0.1:3100/api/images?skip=0&take=10'); // TODO BASE URL
    const data = await res.json();

    return { body: data };
}

const Create: NextPage<Props> = async () => {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery(['getAllImage', '1'], getImages);
    const dehydratedState = dehydrate(queryClient);

    return (
        <AdminLayout title="New Post">
            <div className="max-w-4xl mx-auto">
                <Hydrate state={dehydratedState}>
                    <Editor />
                </Hydrate>
            </div>
        </AdminLayout>
    );
};

export default Create;
