import { Controller, NotFoundException, Req } from '@nestjs/common';

import { TsRest, TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';

import { apiBlog } from '@api-contracts';

import { MultipartFile } from '@fastify/multipart';

import { MediaEntity, User, Post } from '@prisma/client/blog';

import { isNil } from 'lodash';

import { FastifyRequest } from 'fastify';

import { PostService, RevalidateNextService } from '../services';
import { isValidFile } from '../../media/constraints';
import { MediaService } from '../../media/services';
import { getTime } from '../../core/helpers';
import { Guest, ReqUser } from '../../user/decorators';
import { UserService } from '../../user/services';

const c = nestControllerContract(apiBlog.content);

// const testChecker: PermissionChecker = async (ab) => ab.can(PermissionAction.MANAGE, 'all');

@Controller()
@TsRest({ jsonQuery: true })
export class PostController {
    constructor(
        private readonly postService: PostService,
        private readonly mediaService: MediaService,
        private readonly userService: UserService,
        private readonly revalidateNextService: RevalidateNextService,
    ) {}

    // @Guest()
    // @Permission(testChecker)
    @TsRestHandler(c.testGet)
    async getTest(@Req() req: FastifyRequest) {
        // console.log(req);
        return tsRestHandler(c.testGet, async () => {
            // console.log(UserPartialWithRelationsSchema);
            // console.log(UserOptionalDefaultsWithPartialRelationsSchema);
            // console.log('test success \n');
            return { status: 200, body: `${await getTime()}test success` };
        });
    }

    @Guest()
    @TsRestHandler(c.revalidateNext)
    async revalidateNext() {
        return tsRestHandler(c.revalidateNext, async () => {
            const result = await this.revalidateNextService.performValidateRequest();
            if (result.data?.revalidated === true) {
                return { status: 200, body: { message: `刷新成功` } };
            }
            return { status: 400, body: { message: `刷新失败` } };
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
                    translations: true,
                },
            );

            if (post === null) {
                return { status: 404 as const, body: null };
            }
            return { status: 200 as const, body: post };
        });
    }

    /**
     * @deprecated  替换为{@link getPostUniqueWithRelatedPosts} .
     */
    @Guest()
    @TsRestHandler(c.getPostBySlug)
    async getPostBySlug() {
        return tsRestHandler(c.getPostBySlug, async ({ params }) => {
            const post = await this.postService.post(
                { slug: String(params.slug) },
                { thumbnail: true, translations: true },
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
                    translations: true,
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
                    translations: true,
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
        const title = this.extractStringValue(data.title)!;
        const slug = this.extractStringValue(data.slug)!;
        const content =
            data.content !== undefined ? this.extractStringValue(data.content) : undefined;
        const meta = this.extractStringValue(data.meta)!;
        const tags =
            data.tags !== undefined
                ? this.extractStringValue(data.tags)
                      ?.split(',')
                      .map((tag: string) => tag.trim())
                      .filter((tag: string) => tag.length > 0)
                : undefined;
        const lng = this.extractStringValue(data.lng);
        const postData = {
            title,
            slug,
            ...(content !== undefined ? { content } : {}),
            meta,
            ...(!isNil(thumbnailId)
                ? {
                      thumbnail: {
                          connect: { id: thumbnailId },
                      },
                  }
                : {}),
            ...(tags !== undefined ? { tags: { set: tags } } : {}),
        };

        if (method === 'create') {
            if (!isNil(lng)) {
                return this.postService.createPost({
                    ...postData,
                    translations: {
                        create: {
                            language: lng,
                            title: postData.title,
                            content: postData.content,
                            meta: postData.meta,
                        },
                    },
                });
            }
            return this.postService.createPost(postData);
        }
        if (!isNil(lng)) {
            return this.postService.addOrUpdatePostTranslation({
                where: {
                    id,
                },
                data: postData,
                lng,
            });
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
                const revalidateNextResult =
                    await this.revalidateNextService.performValidateRequest();
                if (revalidateNextResult.data?.revalidated === true) {
                    console.log(`刷新Next成功`);
                } else {
                    console.log(`刷新Next失败`);
                }
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

    // ts-rest 配合react-query使用,multipart/form-data会有json解析方面的问题
    extractStringValue(value: string | any): string | undefined {
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
            const result = await this.postService.getPostLikeStatus(
                { id: postId },
                user?.id || undefined,
            );
            return {
                status: 200 as const,
                body: { likesCount: result.likesCount, likedByOwner: result.likedByOwner },
            };
        });
    }

    @TsRestHandler(c.updatePostLike)
    async updatePostLike(@ReqUser() user: ClassToPlain<User>) {
        return tsRestHandler(c.updatePostLike, async ({ body: { postId } }) => {
            try {
                const updatedPost = await this.postService.updateLike({
                    postUniqueWhere: { id: postId },
                    userId: user.id,
                });
                return {
                    status: 201 as const,
                    body: { newLikes: updatedPost.likedUsers.length },
                };
            } catch (error) {
                return { status: 400 as const, body: { message: `${(error as Error).message}` } };
            }
        });
    }

    @Guest()
    @TsRestHandler(c.getPostUniqueWithRelatedPosts, { jsonQuery: true })
    async getPostUniqueWithRelatedPosts() {
        return tsRestHandler(c.getPostUniqueWithRelatedPosts, async ({ query: { args } }) => {
            try {
                return {
                    status: 200 as const,
                    body: await this.postService.findUniqueOrThrowWithRelatedPosts(args),
                };
            } catch (error) {
                return {
                    status: 404 as const,
                    body: { message: `${(error as Error).message}` },
                };
            }
        });
    }
}
