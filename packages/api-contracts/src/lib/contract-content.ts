import { initContract } from '@ts-rest/core';
import { z } from 'zod';

import {
    CommentPartialWithRelationsSchema,
    CommentWithPartialRelationsSchema,
    MediaEntityPartialWithRelationsSchema,
    PostFindUniqueOrThrowArgsSchema,
    PostPartialSchema,
    // CommentWithRelationsSchema,
    PostSchema,
    PostWithPartialRelationsSchema,
    TranslationPartialWithRelationsSchema,
    UserLikedPostsPartialWithRelationsSchema,
    UserPartialWithRelationsSchema,
} from '../zod';

import { ObjectIdSchema } from './types';

const c = initContract();

export const contentContract = c.router(
    {
        getPostById: {
            method: 'GET',
            path: `/post/:id`,
            pathParams: z.object({
                id: z.string().uuid(),
            }),
            responses: {
                200: PostWithPartialRelationsSchema,
                404: z.null(),
            },
        },
        getPostUniqueWithRelatedPosts: {
            method: 'POST',
            path: `/post-find-unique`,
            responses: {
                200: PostPartialSchema.merge(
                    z.object({
                        thumbnail: z.lazy(() => MediaEntityPartialWithRelationsSchema).nullable(),
                        author: z.lazy(() => UserPartialWithRelationsSchema).nullable(),
                        likedUsers: z.lazy(() => UserLikedPostsPartialWithRelationsSchema).array(),
                        comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
                        translations: z.lazy(() => TranslationPartialWithRelationsSchema).array(),
                        relatedPosts: z.lazy(() => PostSchema).array(),
                    }),
                ).partial(),
                404: z.object({ message: z.string() }),
            },
            body: z.object({
                args: PostFindUniqueOrThrowArgsSchema,
            }),
        },
        getPostBySlug: {
            method: 'GET',
            path: `/post/slug/:slug`,
            pathParams: z.object({
                slug: z.string().min(1).max(50),
            }),
            responses: {
                200: PostSchema.merge(
                    z
                        .object({
                            thumbnail: z
                                .lazy(() => MediaEntityPartialWithRelationsSchema)
                                .nullable(),
                            author: z.lazy(() => UserPartialWithRelationsSchema).nullable(),
                            likedUsers: z
                                .lazy(() => UserLikedPostsPartialWithRelationsSchema)
                                .array(),
                            comments: z.lazy(() => CommentPartialWithRelationsSchema).array(),
                            translations: z
                                .lazy(() => TranslationPartialWithRelationsSchema)
                                .array(),
                            relatedPosts: z.lazy(() => PostSchema).array(),
                        })
                        .partial(),
                ),
                404: z.null(),
            },
        },
        getPosts: {
            method: 'GET',
            path: '/posts',
            responses: {
                200: z.object({
                    posts: PostWithPartialRelationsSchema.array(),
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
            summary: 'Get all posts',
        },
        getFilteredPosts: {
            method: 'GET',
            path: '/posts/:searchString',
            pathParams: z.object({
                searchString: z.string().min(1).max(20),
            }),
            responses: {
                200: PostWithPartialRelationsSchema.array(),
            },
        },
        createPost: {
            method: 'POST',
            path: '/post',
            contentType: 'multipart/form-data',
            responses: {
                201: PostSchema,
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
            body: z.object({
                title: z
                    .object({
                        value: z.string().max(300),
                    })
                    .passthrough()
                    .or(z.string().max(300)),
                slug: z
                    .object({
                        value: z.string().max(300),
                    })
                    .passthrough()
                    .or(z.string().max(300)),
                content: z
                    .object({
                        value: z.string().optional(),
                    })
                    .passthrough()
                    .or(z.string().optional())
                    .optional(),
                meta: z
                    .object({
                        value: z.string().max(1000),
                    })
                    .passthrough()
                    .or(z.string().max(1000)),
                lng: z
                    .object({
                        value: z.string().optional(),
                    })
                    .passthrough()
                    .or(z.string().optional())
                    .optional(),
                tags: z
                    .object({
                        value: z.string().max(1000),
                    })
                    .passthrough()
                    .or(z.string().max(1000)),
                image: z.any().optional(), // 直接交由服务器处理
            }),
        },

        updatePost: {
            method: 'PATCH',
            path: `/posts`,
            contentType: 'multipart/form-data',
            responses: { 200: PostSchema, 404: z.object({ message: z.string() }) },
            body: z.object({
                id: z
                    .object({
                        value: ObjectIdSchema,
                    })
                    .passthrough()
                    .or(ObjectIdSchema),
                title: z
                    .object({
                        value: z.string().max(300),
                    })
                    .passthrough()
                    .or(z.string().max(300)),
                slug: z
                    .object({
                        value: z.string().max(300),
                    })
                    .passthrough()
                    .or(z.string().max(300)),
                content: z
                    .object({
                        value: z.string().optional(),
                    })
                    .passthrough()
                    .or(z.string().optional())
                    .optional(),
                lng: z
                    .object({
                        value: z.string().optional(),
                    })
                    .passthrough()
                    .or(z.string().optional())
                    .optional(),
                meta: z
                    .object({
                        value: z.string().max(1000),
                    })
                    .passthrough()
                    .or(z.string().max(1000)),
                tags: z
                    .object({
                        value: z.string().max(1000),
                    })
                    .passthrough()
                    .or(z.string().max(1000)),
                image: z.any().optional(), // 直接交由服务器处理
            }),
            summary: 'Update a post',
        },
        deletePost: {
            method: 'DELETE',
            path: `/post/:id`,
            pathParams: z.object({
                id: z.string().uuid(),
            }),
            responses: {
                200: z.object({ message: z.string() }),
                404: z.object({ message: z.string() }),
            },
            body: null,
        },
        getPostLikeStatus: {
            method: 'GET',
            path: `/like-status`,
            responses: {
                200: z.object({ likesCount: z.number(), likedByOwner: z.boolean() }),
                404: z.object({ message: z.string() }),
            },
            query: z.object({
                postId: z.string(),
            }),
        },
        updatePostLike: {
            method: 'POST',
            path: `/like-status`,
            responses: {
                200: z.object({ newLikes: z.number() }),
                404: z.object({ message: z.string() }),
            },
            body: z.object({
                postId: z.string(),
            }),
        },
        getCommentsByPostId: {
            method: 'GET',
            path: `/comments-by-post`,
            query: z.object({
                belongsTo: z.string().uuid(),
                // take: z
                //     .string()
                //     .transform(Number)
                //     .refine((n) => !Number.isNaN(n), {
                //         message: 'take must be a valid number',
                //     }),
                // skip: z
                //     .string()
                //     .transform(Number)
                //     .refine((n) => !Number.isNaN(n), {
                //         message: 'take must be a valid number',
                //     }),
                take: z.number().default(50),
                skip: z.number().default(0),
            }),
            summary: 'Get all Comments',

            responses: {
                200: z.object({
                    comments: CommentWithPartialRelationsSchema.array(),
                    count: z.number(),
                    skip: z.number(),
                    take: z.number(),
                }),

                404: z.null(),
            },
        },
        getComments: {
            method: 'GET',
            path: `/comments`,
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
            summary: 'Get all Comments',

            responses: {
                200: z.object({
                    comments: CommentWithPartialRelationsSchema.array(),
                    count: z.number(),
                    skip: z.number(),
                    take: z.number(),
                }),

                404: z.null(),
            },
        },
        createChiefComment: {
            method: 'POST',
            path: '/comment',
            body: z.object({
                content: z.string(),
                belongsTo: z.string().uuid(),
            }),
            responses: {
                201: CommentWithPartialRelationsSchema,
                404: z.null(),
            },
        },
        addReplay: {
            method: 'POST',
            path: '/comment/add-replay',
            body: z.object({
                content: z.string(),
                repliedTo: z.string().uuid(),
            }),
            responses: {
                201: CommentWithPartialRelationsSchema,
                404: z.null(),
            },
        },
        updateLike: {
            method: 'POST',
            path: '/comment/update-like',
            body: z.object({
                id: z.string().uuid(),
            }),
            responses: {
                201: CommentWithPartialRelationsSchema,
                // CommentOptionalDefaultsWithPartialRelationsSchema.merge,
                404: z.null(),
            },
        },
        updateComment: {
            method: 'PATCH',
            path: `/comment`,
            body: z.object({
                content: z.string(),
                id: z.string().uuid(),
            }),
            responses: {
                201: CommentWithPartialRelationsSchema,
                404: z.null(),
            },
        },
        deleteComment: {
            method: 'DELETE',
            path: `/comment/:id`,
            pathParams: z.object({
                id: z.string().uuid(),
            }),
            responses: {
                200: z.object({ message: z.string() }),
                404: z.object({ message: z.string() }),
            },
            body: null,
        },
        revalidateNext: {
            method: 'GET',
            path: `/revalidate-next`,
            responses: {
                200: z.object({ message: z.string() }),
                404: z.object({ message: z.string() }),
            },
        },
        testGet: {
            method: 'GET',
            path: `/test`,
            responses: {
                200: z.string(),
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
// TODO prismaSchema + 此处  都添加细致的校验规则
