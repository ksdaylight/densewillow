import { initContract } from '@ts-rest/core';
import { z } from 'zod';

import { MultipartValueZod, ObjectIdSchema, PostSchema, multipartFileSchema } from './types';

const c = initContract();

export const contentContract = c.router(
    {
        getPostById: {
            method: 'GET',
            path: `/post/:id`,
            pathParams: z.object({
                id: ObjectIdSchema,
            }),
            responses: {
                200: PostSchema,
                404: z.null(),
            },
        },
        getPostBySlug: {
            method: 'GET',
            path: `/post/slug/:slug`,
            pathParams: z.object({
                slug: z.string().min(1).max(50),
            }),
            responses: {
                200: PostSchema,
                404: z.null(),
            },
        },
        getPosts: {
            method: 'GET',
            path: '/posts',
            responses: {
                200: z.object({
                    posts: PostSchema.array(),
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
        getFilteredPosts: {
            method: 'GET',
            path: '/posts/:searchString',
            pathParams: z.object({
                searchString: z.string().min(1).max(20),
            }),
            responses: {
                200: z.array(PostSchema),
            },
        },
        createPost: {
            method: 'POST',
            path: '/post',
            contentType: 'multipart/form-data',
            responses: {
                201: PostSchema,
                404: z.object({ message: z.string() }),
            },
            body: z.object({
                title: MultipartValueZod.or(z.string()),
                slug: MultipartValueZod.or(z.string()),
                content: MultipartValueZod.or(z.string()).optional(),
                meta: MultipartValueZod.or(z.string()),
                tags: MultipartValueZod.or(z.string().array()).optional(),
                image: multipartFileSchema.optional(),
            }),
        },

        updatePost: {
            method: 'PATCH',
            path: `/posts`,
            contentType: 'multipart/form-data',
            responses: { 200: PostSchema, 404: z.object({ message: z.string() }) },
            body: z.object({
                id: MultipartValueZod.or(ObjectIdSchema), // 没做检验
                title: MultipartValueZod.or(z.string()),
                slug: MultipartValueZod.or(z.string()),
                content: MultipartValueZod.or(z.string()).optional(),
                meta: MultipartValueZod.or(z.string()),
                tags: MultipartValueZod.or(z.string().array()).optional(),
                image: multipartFileSchema.optional(),
            }),
            summary: 'Update a post',
            // metadata: {
            //     roles: ['user'],
            //     resource: 'post',
            //     identifierPath: 'params.id',
            // } as const,
        },
        deletePost: {
            method: 'DELETE',
            path: `/post/:id`,
            responses: {
                200: z.object({ message: z.string() }),
                404: z.object({ message: z.string() }),
            },
            body: null,
        },
    },
    {
        baseHeaders: z.object({
            'x-api-key': z.string().optional(),
        }),
    },
);
