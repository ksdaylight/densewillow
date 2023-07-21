import { z } from 'zod';
import { initContract } from '@ts-rest/core';

import { mediaContract } from './contract-media';
import { contentContract } from './contract-content';
import { userContract } from './contract-user';
// import { MediaContract } from './contract-media';

const c = initContract();

export const apiBlog = c.router(
    {
        content: contentContract,

        images: mediaContract,

        user: userContract,
    },
    {
        baseHeaders: z.object({
            'x-api-key': z.string().optional(),
        }),
        pathPrefix: `/${process.env['APP_PREFIX']}`,
    },
);
