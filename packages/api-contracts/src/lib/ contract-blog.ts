import { z } from 'zod';
import { initContract } from '@ts-rest/core';

const c = initContract();

const PostSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string().nullable(),
    published: z.boolean().nullable(),
    authorId: z.string(),
});

export const apiBlog = c.router(
    {
        getPostById: {
            method: 'GET',
            path: `/post/:id`,
            responses: {
                200: PostSchema,
                404: z.null(),
            },
        },
        getPostsAndItems: {
            method: 'GET',
            path: '/feed',
            responses: {
                200: z.array(PostSchema),
            },
        },
        getFilteredPosts: {
            method: 'GET',
            path: '/filter/:searchString',
            responses: {
                200: z.array(PostSchema),
            },
        },
        createPost: {
            method: 'POST',
            path: '/post',
            responses: {
                201: PostSchema,
            },
            body: z.object({
                title: z.string(),
                content: z.string().optional(),
                authorEmail: z.string(),
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
            'x-api-key': z.string(),
        }),
    },
);
