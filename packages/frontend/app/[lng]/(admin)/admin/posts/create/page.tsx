import { NextPage } from 'next';

import { dehydrate } from '@tanstack/query-core';

import Editor from '@frontend/components/Editor';

import getQueryClient from '@frontend/utils/getQueryClient';
import Hydrate from '@frontend/utils/hydrate.client';
import { privateApiUrl } from '@frontend/utils/helps';

interface Props {}

interface Props {}
async function getImages() {
    const res = await fetch(`${privateApiUrl}/api/images?skip=0&take=20`);
    const data = await res.json();

    return { body: data };
}

const Create: NextPage<Props> = async () => {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery(['getAllImage', '1'], getImages);
    const dehydratedState = dehydrate(queryClient);

    return (
        <div className="max-w-4xl mx-auto">
            <Hydrate state={dehydratedState}>
                <Editor />
            </Hydrate>
        </div>
    );
};

export default Create;
