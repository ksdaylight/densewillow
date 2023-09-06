import { QueryFunctionContext, dehydrate } from '@tanstack/query-core';

import Hydrate from '@frontend/utils/hydrate.client';
import getQueryClient from '@frontend/utils/getQueryClient';

import PostSlugPage from './slug-page';
// TODO generateStaticParams
async function getPost({ queryKey }: QueryFunctionContext) {
    const [, slug] = queryKey;
    const res = await fetch(`http://127.0.0.1:3100/api/post/slug/${slug}`, {
        credentials: 'include',
        cache: 'no-store',
    }); // TODO BASE URL
    const data = await res.json();
    console.log(data);
    return { body: data };
}
const PostSlug = async ({ params }: { params: { slug: string } }) => {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(['getPostBySlug', params.slug], getPost);
    const dehydratedState = dehydrate(queryClient);
    return (
        <Hydrate state={dehydratedState}>
            <PostSlugPage initialSlug={params.slug} />
        </Hydrate>
    );
};

export default PostSlug;
