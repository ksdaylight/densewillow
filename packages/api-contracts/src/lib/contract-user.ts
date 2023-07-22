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
                201: z.object({ token: z.string() }),
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
        },
    },
    {
        pathPrefix: '/auth',
        baseHeaders: z.object({
            'x-api-key': z.string().optional(),
        }),
    },
);
