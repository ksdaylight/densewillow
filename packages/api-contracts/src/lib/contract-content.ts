import { initContract } from '@ts-rest/core';
import { z } from 'zod';

import { MultipartValue, ObjectIdSchema, PostSchema, multipartFileSchema } from './types';

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
                201: z.object({ message: z.string() }),
                // 201: PostSchema,
            },
            body: z.object({
                title: MultipartValue,
                content: MultipartValue.optional(),
                authorEmail: MultipartValue,
                image: multipartFileSchema.optional(),
            }),
        },
        publishPost: {
            method: 'PUT',
            path: `/publish/:id`,
            body: null,
            responses: {
                200: PostSchema,
            },
        },
        updatePost: {
            method: 'PATCH',
            path: `/posts/:id`,
            responses: { 200: PostSchema },
            body: z.object({
                title: z.string().optional(),
                content: z.string().optional(),
                published: z.boolean().optional(),
                description: z.string().optional(),
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
