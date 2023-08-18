import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const userContract = c.router(
    {
        githubAuth: {
            method: 'GET',
            path: `/github`,

            responses: {
                200: z.object({ message: z.string() }),
                404: z.null(),
            },
        },
        githubAuthCallback: {
            method: 'GET',
            path: `/github/callback`,
            responses: {
                200: z.unknown(),
                // 404: z.object({ message: z.string() }),
            },
            // body: c.type<{
            //     title: string;
            //     slug: string;
            //     content: string;
            //     meta: string;
            //     tags: string[];
            //     image: MultipartFile;
            // }>(),
        },
        getUserProfile: {
            method: 'GET',
            path: `/user-profile`,
            responses: {
                200: z.any(),
                // 404: z.object({ message: z.string() }),
            },
        },
        getUsers: {
            method: 'GET',
            path: '/users',
            responses: {
                200: z.object({
                    users: z.any(),
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
            summary: 'Get all user',
        },
        logout: {
            method: 'POST',
            path: '/logout',
            responses: {
                // 201: z.unknown(),
                404: z.object({ message: z.string() }),
                200: z.unknown(),
            },
            body: z.any(),
        },
    },
    {
        pathPrefix: '/auth',
        baseHeaders: z.object({
            'x-api-key': z.string().optional(),
        }),
    },
);
