import { z } from 'zod';

export const ObjectIdSchema = z.string().refine(
    (value) => {
        // 移除可能存在的额外引号
        const cleanedValue = value.replace(/^"|"$/g, '');
        return /^[a-f\d]{24}$/i.test(cleanedValue);
    },
    (val) => ({ message: `${val}` }),
);

export const MultipartValueZod = z
    .object({
        type: z.literal('field').optional(),
        value: z.string(),
        fieldname: z.string(),
        mimetype: z.string(),
        encoding: z.string(),
        fieldnameTruncated: z.boolean(),
        valueTruncated: z.boolean(),
        fields: z.unknown(),
    })
    .passthrough();

export const MultipartFileZod = z
    .object({
        type: z.literal('file'),
        toBuffer: z.function(),
        file: z.unknown(),
        fieldname: z.string(),
        filename: z.string(),
        encoding: z.string(),
        mimetype: z.string(),
        fields: z.unknown(),
    })
    .passthrough();

export const multipartFileSchema = z.union([MultipartFileZod, MultipartValueZod]);
