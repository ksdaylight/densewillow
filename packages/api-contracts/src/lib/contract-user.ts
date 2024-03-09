import { initContract } from '@ts-rest/core';
import { z } from 'zod';

import { UserSchema } from '../zod';

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
            },
        },
        getUserProfile: {
            method: 'GET',
            path: `/user-profile`,
            responses: {
                200: UserSchema,
                // 404: z.object({ message: z.string() }),
            },
        },
        getUsers: {
            method: 'GET',
            path: '/users',
            responses: {
                200: z.object({
                    users: UserSchema.array(),
                    count: z.number(),
                    skip: z.number(),
                    take: z.number(),
                }),
                404: z.null(),
            },
            query: z.object({
                take: z.number().default(50),
                skip: z.number().default(0),
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
        // 以下是测试用的
        testSingIn: {
            method: 'POST',
            path: '/auth/signin',
            responses: {
                200: z.object({
                    status: z.number().optional(),
                    message: z.string().optional(),
                    data: z.object({
                        user: z
                            .object({
                                id: z.string(),
                                username: z.string(),
                                email: z.string().email(),
                                avatar: z.string().optional(),
                                createdAt: z.date().optional(),
                                updatedAt: z.date().optional(),
                                password: z.string().optional(),
                                role: z.any().optional(), // Simplified, adjust based on actual role structure
                                permissions: z.any().optional(), // Simplified, adjust based on actual permissions structure
                            })
                            .optional(),
                        accessToken: z.string().uuid().optional(),
                        refreshToken: z.string().uuid().optional(),
                    }),
                }),
                404: z.object({ message: z.string() }),
            },
            body: z.object({
                username: z.string(),
                password: z.string(),
            }),
            summary: 'Get all user',
        },
    },
    {
        pathPrefix: '/auth',
        baseHeaders: z.object({
            'x-api-key': z.string().optional(),
        }),
    },
);
