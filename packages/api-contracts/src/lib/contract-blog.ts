import { z } from 'zod';
import { initContract } from '@ts-rest/core';
import { StreamableFile } from '@nestjs/common';
// import { MediaContract } from './contract-media';

const c = initContract();

const PostSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string().nullable(),
    published: z.boolean().nullable(),
    authorId: z.string(),
});
const MediaSchema = z.object({
    id: z.string(),
    file: z.string(),
    ext: z.string(),
    createdAt: z.date(),
});

export const mediaContract = c.router(
    {
        loadImage: {
            method: 'GET',
            path: `/images/:id.:ext`,
            summary: 'get image ',
            responses: {
                200: c.type<StreamableFile>(),
                404: z.null(),
            },
        },
        getImages: {
            method: 'GET',
            path: '/images',
            responses: {
                200: z.array(MediaSchema),
                404: z.null(),
            },
        },
        uploadImage: {
            method: 'POST',
            path: '/uploadImage',
            contentType: 'multipart/form-data', // <- Only difference
            body: c.type<any>(), // <- Use File type in here
            responses: {
                200: z.object({
                    uploadedFile: z.object({
                        id: z.string(),
                        file: z.number(),
                        ext: z.string(),
                        date: z.date(),
                    }),
                }),
                400: z.object({
                    message: z.string(),
                }),
            },
        },
        deleteImage: {
            method: 'DELETE',
            path: `/image/:id`,
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
            'x-api-key': z.string(),
        }),
    },
);

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
        postFileTest: {
            method: 'POST',
            path: '/file',
            contentType: 'multipart/form-data', // <- Only difference
            body: c.type<any>(), // <- Use File type in here
            responses: {
                200: z.object({
                    uploadedFile: z.object({
                        id: z.string(),
                        file: z.number(),
                        ext: z.string(),
                        date: z.date(),
                    }),
                }),
                400: z.object({
                    message: z.string(),
                }),
            },
        },

        images: mediaContract,
    },
    {
        baseHeaders: z.object({
            'x-api-key': z.string(),
        }),
        pathPrefix: `/${process.env['APP_PREFIX']}`,
    },
);
