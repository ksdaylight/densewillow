import { initContract } from '@ts-rest/core';
import { z } from 'zod';

import { PostFindUniqueOrThrowArgsSchema, PostWithPartialRelationsSchema } from '../zod';

const c = initContract();
export const testZodContract = c.router(
    {
        getPostUniqueZod: {
            method: 'POST',
            path: `/post-zod-unique`,
            body: PostFindUniqueOrThrowArgsSchema,
            responses: {
                200: PostWithPartialRelationsSchema,
                404: z.null(),
            },
        }, // 不需要Hydration、GET、提升速度等ssr相关的东西时，用这种很方便 important

        getPostsZod: {
            method: 'GET',
            path: '/posts-zod',
            responses: {
                200: z.object({
                    posts: PostWithPartialRelationsSchema.array(),
                    count: z.number(),
                    skip: z.number(),
                    take: z.number(),
                }),
                404: z.null(),
            },
            query: z.object({
                take: z
                    .string()
                    .transform(Number)
                    .refine((n) => !Number.isNaN(n), {
                        message: 'take must be a valid number',
                    }),
                skip: z
                    .string()
                    .transform(Number)
                    .refine((n) => !Number.isNaN(n), {
                        message: 'take must be a valid number',
                    }),
            }),
            summary: 'Get all posts',
        },
    },
    {
        baseHeaders: z.object({
            'x-api-key': z.string().optional(),
        }),
    },
);
