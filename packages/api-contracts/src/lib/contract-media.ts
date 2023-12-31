import { z } from 'zod';
import { initContract } from '@ts-rest/core';
import { StreamableFile } from '@nestjs/common';
import { MultipartFile } from '@fastify/multipart';

import { MediaEntitySchema } from '../zod';

// import { MediaContract } from './contract-media';

const c = initContract();

export function createStringSchema(minLength: number, maxLength: number) {
    return z
        .string()
        .min(minLength, `The param's can not less then ${minLength}!`)
        .max(maxLength, `The param's can not surpass then ${maxLength}!`);
}

export const mediaContract = c.router(
    {
        loadImage: {
            method: 'GET',
            path: `/images/:id.:ext`,
            pathParams: z.object({
                id: z.string().uuid(),
                ext: createStringSchema(1, 10),
            }),
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
                200: z.object({
                    images: MediaEntitySchema.array(),
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
            summary: 'Get all images',
        },
        uploadImage: {
            method: 'POST',
            path: '/uploadImage',
            contentType: 'multipart/form-data', // <- Only difference
            // body: c.type<any>(), // <- Use File type in here
            body: c.type<{ image: MultipartFile }>(), // <- Use File type in here
            responses: {
                200: MediaEntitySchema,
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
    },
    {
        baseHeaders: z.object({
            'x-api-key': z.string().optional(),
        }),
    },
);
