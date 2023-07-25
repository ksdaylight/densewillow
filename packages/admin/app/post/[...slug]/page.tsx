import { QueryFunctionContext, dehydrate } from '@tanstack/query-core';

import Editor from '../../../components/Editor';
import Hydrate from '../../../utils/hydrate.client';
import getQueryClient from '../../../utils/getQueryClient';

async function getPost({ queryKey }: QueryFunctionContext) {
    const [, slug] = queryKey;
    const res = await fetch(`http://127.0.0.1:3100/api/post/slug/${slug}`); // TODO BASE URL
    const data = await res.json();
    return { body: data };
}
const PostSlug = async ({ params }: { params: { slug: string } }) => {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(['getPostBySlug', params.slug], getPost);
    const dehydratedState = dehydrate(queryClient);
    return (
        <Hydrate state={dehydratedState}>
            <Editor btnTitle="Update" initialSlug={params.slug} />
        </Hydrate>
    );
};

export default PostSlug;
