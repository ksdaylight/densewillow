import { z } from 'zod';

// import { MultipartFile  } from '@fastify/multipart';

// export const MediaSchema = z.object({
//     id: z.string(),
//     file: z.string(),
//     ext: z.string(),
//     createdAt: z.date(),
// });

export const ObjectIdSchema = z.string().refine(
    (value) => {
        // 移除可能存在的额外引号
        const cleanedValue = value.replace(/^"|"$/g, '');
        return /^[a-f\d]{24}$/i.test(cleanedValue);
    },
    (val) => ({ message: `${val}` }),
);
// export const PostSchema2 = z
//     .object({
//         id: z.string(),
//         title: z.string(),
//         slug: z.string(),
//         content: z.string().nullable(),
//         meta: z.string(),
//         tags: z.array(z.string()),
//         thumbnailId: z.string().nullable(),  // 移除可能存在的额外引号

//         thumbnail: MediaSchema.nullable(),
//         likedByUserIDs: z.array(z.string()),
//         authorId: z.string(),
//         createdAt: z.date(),
//         updatedAt: z.date(),
//         relatedPosts: z
//             .array(
//                 z.object({
//                     id: z.string(),
//                     title: z.string(),
//                     slug: z.string(),
//                 }),
//             )
//             .nullable()
//             .optional(),
//         author: z
//             .object({
//                 id: z.string(),
//                 name: z.string(),
//                 avatar: z.string(),
//                 message: z.string(),
//             })
//             .nullable()
//             .optional(),
//     })
//     .passthrough();
// export const CommentFormatSchema = z.object({
//     id: z.string(),
//     content: z.string().nullable(),
//     likes: z.number(),
//     chiefComment: z.boolean(),
//     createdAt: z.string(),
//     owner: z.object({
//         id: z.string(),
//         name: z.string(),
//         avatar: z.string().nullable(),
//     }),
//     repliedTo: z.string().nullable(),
//     likedByOwner: z.boolean(),
//     belongsTo: z.object({
//         id: z.string(),
//         title: z.string(),
//         slug: z.string(),
//     }),
// });

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
