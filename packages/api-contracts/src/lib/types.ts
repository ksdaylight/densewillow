import { z } from 'zod';

// import { MultipartFile  } from '@fastify/multipart';

export const MediaSchema = z.object({
    id: z.string(),
    file: z.string(),
    ext: z.string(),
    createdAt: z.date(),
});
export const ObjectIdSchema = z.string().refine((value) => /^[a-f\d]{24}$/i.test(value), {
    message: 'Invalid ObjectId',
});
export const PostSchema = z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    content: z.string().nullable(),
    meta: z.string(),
    tags: z.array(z.string()),
    thumbnailId: z.string().nullable(),
    thumbnail: MediaSchema.nullable(),
    authorId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const MultipartValue = z.object({
    type: z.literal('field'),
    value: z.string(),
    fieldname: z.string(),
    mimetype: z.string(),
    encoding: z.string(),
    fieldnameTruncated: z.boolean(),
    valueTruncated: z.boolean(),
    fields: z.unknown(), // 暂时随意定义
});

export const MultipartFileZod = z.object({
    type: z.literal('file'),
    toBuffer: z.function(),
    file: z.unknown(), // 暂时随意定义
    fieldname: z.string(),
    filename: z.string(),
    encoding: z.string(),
    mimetype: z.string(),
    fields: z.unknown(), // 暂时随意定义
});

export const multipartFileSchema = z.union([MultipartFileZod, MultipartValue]);
