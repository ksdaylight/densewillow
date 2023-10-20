import { initContract } from '@ts-rest/core';
import { z } from 'zod';

import { ContactMessageCreateArgsSchema, ContactMessagePartialSchema } from '../zod';

const c = initContract();
export const portfolioContract = c.router(
    {
        addContactMessage: {
            method: 'POST',
            path: `/add-contact-message`,
            body: ContactMessageCreateArgsSchema,
            responses: {
                200: ContactMessagePartialSchema,
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
