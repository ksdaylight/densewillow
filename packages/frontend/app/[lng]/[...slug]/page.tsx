import { QueryFunctionContext, dehydrate } from '@tanstack/query-core';

import Hydrate from '@frontend/utils/hydrate.client';
import getQueryClient from '@frontend/utils/getQueryClient';

import { NextPage } from 'next';

import { useTranslation } from '../../i18n';

import PostSlugPage from './slug-page';

interface Props {
    params: {
        lng: string;
        slug: string[];
    };
}
// TODO generateStaticParams
async function getPost({ queryKey }: QueryFunctionContext) {
    const [, slug] = queryKey;
    const res = await fetch(`http://127.0.0.1:3100/api/post/slug/${slug}`, {
        credentials: 'include',
        cache: 'no-store',
    }); // TODO BASE URL
    const data = await res.json();
    return { body: data };
}
const PostSlug: NextPage<Props> = async ({ params }) => {
    const { t } = await useTranslation(params.lng, 'second-page');
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(['getPostBySlug', params.slug[0]], getPost);
    const dehydratedState = dehydrate(queryClient);
    return (
        <Hydrate state={dehydratedState}>
            <h1>{t('title')}</h1>
            <PostSlugPage initialSlug={params.slug[0]} />
        </Hydrate>
    );
};

export default PostSlug;
