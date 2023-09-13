import { PostWithPartialRelationsSchema } from 'packages/api-contracts/src/zod';
import { z } from 'zod';

export const PostsResponseSchema = z.object({
    posts: PostWithPartialRelationsSchema.array(),
    count: z.number(),
    skip: z.number(),
    take: z.number(),
});
