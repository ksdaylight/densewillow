import { MetadataRoute } from 'next';
import { PostWithPartialRelationsSchema } from 'packages/api-contracts/src/zod';
import { z } from 'zod';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseURL = process.env.NEXT_PUBLIC_SITE_URL as string;
    const res = await fetch(`http://127.0.0.1:3100/api/posts?take=10000&skip=0`, {
        credentials: 'include',
        cache: 'no-store',
    }); // TODO BASE URL
    const responseSchema = z.object({
        posts: PostWithPartialRelationsSchema.array(),
        count: z.number(),
        skip: z.number(),
        take: z.number(),
    });
    const data: z.infer<typeof responseSchema> = await res.json();
    const { posts } = data;
    const postLinks = posts?.map((post) => {
        return [
            {
                url: `${baseURL}/en/${post.slug}`,
                lastModified: new Date(post.updatedAt),
            },
            {
                url: `${baseURL}/cn/${post.slug}`,
                lastModified: new Date(post.updatedAt),
            },
            {
                url: `${baseURL}/${post.slug}`,
                lastModified: new Date(post.updatedAt),
            },
        ];
    });
    const dynamicLinks = postLinks?.flat() ?? [];
    return [
        {
            url: baseURL,
            lastModified: new Date(),
        },
        {
            url: `${baseURL}/en`,
            lastModified: new Date(),
        },
        {
            url: `${baseURL}/cn`,
            lastModified: new Date(),
        },
        ...dynamicLinks,
    ];
}
