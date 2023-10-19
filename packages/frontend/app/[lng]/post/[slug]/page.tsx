import { QueryFunctionContext, dehydrate } from '@tanstack/query-core';

import Hydrate from '@frontend/utils/hydrate.client';
import getQueryClient from '@frontend/utils/getQueryClient';

import { NextPage } from 'next';

// import LngSwitcherService from '@frontend/components/common/LngSwitcher';

// import { useTranslation } from '../../i18n';

import { cache } from 'react';

import { privateApiUrl } from '@frontend/utils/helps';

import { PostsResponseSchema } from '@frontend/utils/types';

import { z } from 'zod';

import { languages } from '@frontend/app/i18n/settings';

import { isNil } from 'lodash';

import PostSlugPage from './slug-page';

interface Props {
    params: {
        lng: string;
        slug: string;
    };
}
export const generateStaticParams = async () => {
    try {
        const res = await fetch(`${privateApiUrl}/api/posts?take=10000&skip=0`, {
            credentials: 'include',
        });

        const data: z.infer<typeof PostsResponseSchema> = await res.json();
        const { posts } = data;
        const allParams: { lng: string; slug: string }[] = [];
        languages.forEach((lng) => {
            const params = posts.map((post) => {
                return {
                    lng,
                    slug: post.slug,
                };
            });

            allParams.push(...params);
        });
        return allParams || [];
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching posts');
    }
};
// Generate Metadata Function
export const generateMetadata = async ({
    params: { slug, lng },
}: {
    params: {
        slug: string;
        lng: string;
    };
}) => {
    // const post = await getPostData(slug);
    const post = await getPostData(slug);
    return {
        title: post?.title,
        description: post?.description,
        openGraph: {
            title: post?.title,
            description: post?.meta,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lng}/${slug}`,
            siteName: post?.title,
            locale: lng,
            type: 'website',
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}`,
            languages: {
                'en-US': `${process.env.NEXT_PUBLIC_SITE_URL}/en/${slug}`,
                'zh-CN': `${process.env.NEXT_PUBLIC_SITE_URL}/cn/${slug}`,
            },
        },
    };
};
const getPostData = cache(async (slug: string) => {
    try {
        const res = await fetch(`${privateApiUrl}/api/post/slug/${slug}`, {
            credentials: 'include',
            // cache: 'no-store',
        });
        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching post');
    }
});
const getPostDataByJsonQuery = cache(async (slug: string) => {
    try {
        const queryArgs = {
            where: {
                slug,
            },
            include: {
                thumbnail: true,
                translations: true,
            },
        };
        const res = await fetch(
            `${privateApiUrl}/api/post-find-unique?args=${encodeURIComponent(
                JSON.stringify(queryArgs),
            )}`,
            {
                credentials: 'include',
                // cache: 'no-store',
            },
        ); // ${encodeURIComponent(JSON.stringify(data))}
        const data = await res.json();

        // console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching post');
    }
});
async function getPost({ queryKey }: QueryFunctionContext) {
    const [, slug] = queryKey;

    // const data = await getPostData(slug as string);
    const data = await getPostDataByJsonQuery(slug as string);
    return { body: data };
}
const PostSlug: NextPage<Props> = async ({ params }) => {
    // const { t } = await useTranslation(params.lng, 'second-page');
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(['getPostBySlug', params.slug], getPost);
    const dehydratedState = dehydrate(queryClient);
    const post = await getPostData(params.slug);

    /* Structured Data for Google */
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        image: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.lng}/${params.slug}/opengraph-image.png`,
        author: `${
            isNil(post?.author?.name) || post?.author?.name === 'admin'
                ? 'denseWillow'
                : post?.author?.name
        }`,
        genre: post?.tags && post.tags.length > 0 ? post.tags[0] : '',
        publisher: 'DenseWillow',
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.slug}`,
        datePublished: new Date(post.createdAt).toISOString(),
        dateCreated: new Date(post.createdAt).toISOString(),
        dateModified: new Date(post.updatedAt).toISOString(),
        description: post?.meta || '',
        articleBody: post?.content || '',
    };
    return (
        <Hydrate state={dehydratedState}>
            {/* Add JSON-LD to your page */}
            <script
                type="application/ld+json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* <h1>{t('title')}</h1> */}
            {/* <LngSwitcherService lng={params.lng} /> */}
            <PostSlugPage initialSlug={params.slug} lng={params.lng} />
        </Hydrate>
    );
};

export default PostSlug;
