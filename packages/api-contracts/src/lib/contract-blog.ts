import { z } from 'zod';
import { initContract } from '@ts-rest/core';

import { mediaContract } from './contract-media';
import { contentContract } from './contract-content';
import { userContract } from './contract-user';
import { testZodContract } from './contract-zod-test';
import { portfolioContract } from './contract-portfolio';

const c = initContract();

export const apiBlog = c.router(
    {
        content: contentContract,

        images: mediaContract,

        user: userContract,

        zodTest: testZodContract,

        portfolio: portfolioContract,
    },
    {
        baseHeaders: z.object({
            Authorization: z.string().optional(),
        }),
        pathPrefix: `/${process.env['APP_PREFIX']}`,
    },
);
