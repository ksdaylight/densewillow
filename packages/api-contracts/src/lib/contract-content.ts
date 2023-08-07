import { initContract } from '@ts-rest/core';
import { z } from 'zod';

import { MultipartValueZod, ObjectIdSchema, PostSchema } from './types';

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
            // body: c.type<{
            //     title: string;
            //     slug: string;
            //     content: string;
            //     meta: string;
            //     tags: string[];
            //     image: MultipartFile;
            // }>(),
            body: z.object({
                title: z.unknown().or(z.string()),
                slug: MultipartValueZod.or(z.string()),
                content: MultipartValueZod.or(z.string()).optional(),
                meta: MultipartValueZod.or(z.string()),
                tags: MultipartValueZod.or(z.string().array()).optional(),
                image: z.unknown().optional(),
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
                image: z.unknown().optional(),
            }),
            summary: 'Update a post',
        },
        deletePost: {
            method: 'DELETE',
            path: `/post/:id`,
            pathParams: z.object({
                id: ObjectIdSchema,
            }),
            responses: {
                200: z.object({ message: z.string() }),
                404: z.object({ message: z.string() }),
            },
            body: null,
        },
        getCommentsByPostId: {
            method: 'GET',
            path: `/comments-by-post`,
            query: z.object({
                belongsTo: ObjectIdSchema,
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
            summary: 'Get all Comments',

            responses: {
                200: z.any(),
                404: z.null(),
            },
        },
        getComments: {
            method: 'GET',
            path: `/comments`,
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
            summary: 'Get all Comments',

            responses: {
                200: z.any(),
                404: z.null(),
            },
        },
        createChiefComment: {
            method: 'POST',
            path: '/comment',
            body: z.object({
                content: z.string(),
                belongsTo: ObjectIdSchema,
            }),
            responses: {
                201: z.any(),
                404: z.null(),
            },
        },
        addReplay: {
            method: 'POST',
            path: '/comment/add-replay',
            body: z.object({
                content: z.string(),
                repliedTo: ObjectIdSchema,
            }),
            responses: {
                201: z.any(),
                404: z.null(),
            },
        },
        updateLike: {
            method: 'POST',
            path: '/comment/update-like',
            body: z.object({
                id: ObjectIdSchema,
            }),
            responses: {
                201: z.any(),
                404: z.null(),
            },
        },
        updateComment: {
            method: 'PATCH',
            path: `/comment`,
            body: z.object({
                content: z.string(),
                id: ObjectIdSchema,
            }),
            responses: {
                201: z.any(),
                404: z.null(),
            },
        },
        deleteComment: {
            method: 'DELETE',
            path: `/comment/:id`,
            pathParams: z.object({
                id: ObjectIdSchema,
            }),
            responses: {
                200: z.object({ message: z.string() }),
                404: z.object({ message: z.string() }),
            },
            body: null,
        },
        testGet: {
            method: 'GET',
            path: `/test`,
            responses: {
                200: z.string(),
                404: z.null(),
            },
        },
    },
    {
        baseHeaders: z.object({
            'x-api-key': z.string().optional(),
        }),
    },
);
