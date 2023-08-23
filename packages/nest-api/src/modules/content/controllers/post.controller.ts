import { Controller, NotFoundException, Req } from '@nestjs/common';

import { TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';

import { apiBlog, UserOptionalDefaultsWithPartialRelationsSchema } from '@api-contracts';

import { MultipartFile } from '@fastify/multipart';

import { MediaEntity, User, Post } from '@prisma/client/blog';

import { isNil } from 'lodash';

import { FastifyRequest } from 'fastify';

// import { UserOptionalDefaultsWithPartialRelationsSchema } from '@prisma/client/blog/zod';
// import { UserOptionalDefaultsWithPartialRelationsSchema } from '@api-contracts';
// import { UserPartialWithRelationsSchema } from 'packages/prisma-schema-blog/prisma/generated/zod';

import { PostService } from '../services';
import { isValidFile } from '../../media/constraints';
import { MediaService } from '../../media/services';
import { getTime } from '../../core/helpers';
import { Guest, ReqUser } from '../../user/decorators';
import { UserService } from '../../user/services';

const c = nestControllerContract(apiBlog.content);

// const testChecker: PermissionChecker = async (ab) => ab.can(PermissionAction.MANAGE, 'all');

@Controller()
export class ContentController {
    constructor(
        private readonly postService: PostService,
        private readonly mediaService: MediaService,
        private readonly userService: UserService,
    ) {}

    @Guest()
    // @Permission(testChecker)
    @TsRestHandler(c.testGet)
    async getTest(@Req() req: FastifyRequest) {
        // console.log(req);
        return tsRestHandler(c.testGet, async () => {
            // console.log(UserPartialWithRelationsSchema);
            console.log(UserOptionalDefaultsWithPartialRelationsSchema);
            return { status: 200, body: `${await getTime()}test success` };
        });
    }

    @Guest()
    @TsRestHandler(c.getPostById)
    async getPostById() {
        return tsRestHandler(c.getPostById, async ({ params: { id } }) => {
            const post = await this.postService.post(
                { id: String(id) },
                {
                    thumbnail: true,
                },
            );

            if (post === null) {
                return { status: 404 as const, body: null };
            }
            return { status: 200 as const, body: post };
        });
    }

    @Guest()
    @TsRestHandler(c.getPostBySlug)
    async getPostBySlug() {
        return tsRestHandler(c.getPostBySlug, async ({ params }) => {
            const post = await this.postService.post(
                { slug: String(params.slug) },
                { thumbnail: true },
            );
            if (isNil(post)) throw NotFoundException;
            const relatedPosts = await this.postService.findRelatePosts(post);
            const author = await this.userService.getAuthorInfo(post.authorId || undefined);
            if (post === null) {
                return { status: 404 as const, body: null };
            }
            return { status: 200 as const, body: { ...post, author, relatedPosts } };
        });
    }

    @Guest()
    @TsRestHandler(c.getPosts)
    async getPosts() {
        return tsRestHandler(c.getPosts, async ({ query: { take, skip } }) => {
            const { posts, total } = await this.postService.posts({
                take,
                skip,
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    thumbnail: true,
                },
            });
            return { status: 200 as const, body: { posts, count: total, skip, take } };
        });
    }

    @TsRestHandler(c.getFilteredPosts)
    async getFilteredPosts() {
        return tsRestHandler(c.getFilteredPosts, async ({ params: { searchString } }) => {
            const { posts } = await this.postService.posts({
                where: {
                    OR: [
                        {
                            title: {
                                contains: searchString,
                            },
                        },
                        {
                            content: {
                                contains: searchString,
                            },
                        },
                    ],
                },
                include: {
                    thumbnail: true,
                },
            });

            return { status: 200 as const, body: posts };
        });
    }

    // 文件有效性检查函数
    async checkFile(file: MultipartFile): Promise<boolean> {
        return isValidFile(file, {
            mimetypes: ['image/png', 'image/gif', 'image/jpeg', 'image/webp', 'image/svg+xml'],
            fileSize: 1024 * 1024 * 5,
        });
    }

    // 文件上传函数
    async uploadFile(file: MultipartFile): Promise<MediaEntity> {
        return this.mediaService.upload({
            file,
            dir: 'thumbnail',
        });
    }

    // 文章数据创建或更新函数
    async createOrUpdatePost(params: {
        data: any;
        method: string;
        thumbnailId?: string;
        id?: string;
    }): Promise<Post> {
        const { data, method, thumbnailId, id } = params;
        const postData = {
            title: this.extractStringValue(data.title),
            slug: this.extractStringValue(data.slug),
            ...(data.content !== undefined
                ? { content: this.extractStringValue(data.content) }
                : {}),
            meta: this.extractStringValue(data.meta),
            ...(!isNil(thumbnailId)
                ? {
                      thumbnail: {
                          connect: { id: thumbnailId },
                      },
                  }
                : {}),
            ...(data.tags !== undefined
                ? { tags: { set: this.extractArrayValue(data.tags)! } }
                : {}),
        };

        if (method === 'create') {
            return this.postService.createPost(postData);
        }
        return this.postService.updatePost({
            where: {
                id,
            },
            data: postData,
        });
    }

    @TsRestHandler(c.createPost)
    async createPost() {
        return tsRestHandler(c.createPost, async ({ body }) => {
            // const body = body.body;
            let imageId = null;
            try {
                if (!isNil(body.image)) {
                    const realImage = body.image as MultipartFile; // band-aid fix 即使是
                    if (!(await this.checkFile(realImage))) {
                        return { status: 400, body: { message: '请上传5M以内的，图片格式的文件' } };
                    }
                    const imageEntity = await this.uploadFile(realImage);
                    imageId = imageEntity.id;
                }
                const post = await this.createOrUpdatePost({
                    data: body,
                    method: 'create',
                    thumbnailId: !isNil(imageId) ? imageId : undefined,
                });
                return { status: 201 as const, body: post };
            } catch (error) {
                return { status: 400 as const, body: { message: `${(error as Error).message}` } };
            }
        });
    }

    @TsRestHandler(c.updatePost)
    async updatePost() {
        return tsRestHandler(c.updatePost, async ({ body: reqData }) => {
            try {
                let imageId = null;
                if (!isNil(reqData.image)) {
                    // 更新如果只是url时的限制
                    if ((reqData.image as any).type === 'file') {
                        if (!(await this.checkFile(reqData.image as MultipartFile))) {
                            return {
                                status: 400,
                                body: { message: '请上传5M以内的，图片格式的文件' },
                            };
                        }
                        const imageEntity = await this.uploadFile(reqData.image as MultipartFile);
                        imageId = imageEntity.id;
                    }
                }
                const post = await this.createOrUpdatePost({
                    data: reqData,
                    thumbnailId: !isNil(imageId) ? imageId : undefined,
                    method: 'update',
                    id: this.extractStringValue(reqData.id),
                });
                return { status: 201 as const, body: post };
            } catch (error) {
                return { status: 400 as const, body: { message: `${(error as Error).message}` } };
            }
        });
    }

    @TsRestHandler(c.deletePost)
    async deletePost() {
        return tsRestHandler(c.deletePost, async ({ params: { id } }) => {
            await this.postService.deletePost({ id: String(id) });
            return { status: 200 as const, body: { message: 'Post Deleted' } };
        });
    }

    // TODO 封装整合 丑陋 和文件一起传的副作用，
    extractStringValue(value: string | any): string {
        // if (value === undefined) {
        //     return undefined;
        // }
        let jsonString: string;
        if (typeof value === 'string') {
            jsonString = value;
        } else {
            jsonString = value.value as string;
        }
        return JSON.parse(jsonString);
    }

    extractArrayValue(value: string | any): string[] | undefined {
        if (value === undefined) {
            return undefined;
        }
        let jsonString: string;
        if (typeof value === 'string') {
            jsonString = value;
        } else {
            jsonString = value.value as string;
        }
        return JSON.parse(jsonString);
    }

    @Guest()
    @TsRestHandler(c.getPostLikeStatus)
    async getPostLikeStatus(@ReqUser() user: ClassToPlain<User>) {
        return tsRestHandler(c.getPostLikeStatus, async ({ query: { postId } }) => {
            const post = await this.postService.post({ id: String(postId) });
            if (isNil(post)) throw NotFoundException;
            const likesCount = post.likedByUserIDs.length;
            let likedByOwner = false;
            if (!isNil(user)) {
                likedByOwner = post.likedByUserIDs.includes(user.id as any);
            }
            if (post === null) {
                return { status: 404 as const, body: { message: 'no post found' } };
            }
            return { status: 200 as const, body: { likesCount, likedByOwner } };
        });
    }

    @TsRestHandler(c.updatePostLike)
    async updatePostLike(@ReqUser() user: ClassToPlain<User>) {
        return tsRestHandler(c.updatePostLike, async ({ body: { postId } }) => {
            try {
                const post = await this.postService.post({ id: postId });
                if (isNil(post)) throw NotFoundException;
                const oldLikes = post.likedByUserIDs || [];
                const likedBy = user.id;
                const operation = oldLikes.includes(likedBy) ? 'disconnect' : 'connect';
                const updatedPost = await this.postService.updatePost({
                    where: { id: post.id },
                    data: {
                        likedUsers: {
                            [operation]: {
                                id: likedBy,
                            },
                        },
                    },
                    select: {
                        likedByUserIDs: true,
                    },
                });
                return {
                    status: 201 as const,
                    body: { newLikes: updatedPost.likedByUserIDs.length },
                };
            } catch (error) {
                return { status: 400 as const, body: { message: `${(error as Error).message}` } };
            }
        });
    }
}
