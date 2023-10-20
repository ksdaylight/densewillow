import { QueryFunctionContext, dehydrate } from '@tanstack/query-core';

import getQueryClient from '@frontend/utils/getQueryClient';

import Editor from '@frontend/components/Editor';

import Hydrate from '@frontend/utils/hydrate.client';
import { privateApiUrl } from '@frontend/utils/helps';
// import getQueryClient from '@frontend/utils/getQueryClient';

async function getPost({ queryKey }: QueryFunctionContext) {
    const [, slug] = queryKey;
    const res = await fetch(`${privateApiUrl}/api/post/slug/${slug}`);
    const data = await res.json();
    return { body: data };
}
const Update = async ({ params }: { params: { slug: string } }) => {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(['getPostBySlug', params.slug], getPost);
    const dehydratedState = dehydrate(queryClient);
    return (
        <div className="max-w-4xl mx-auto">
            <Hydrate state={dehydratedState}>
                <Editor btnTitle="Update" initialSlug={params.slug} />
            </Hydrate>
        </div>
    );
};

export default Update;
