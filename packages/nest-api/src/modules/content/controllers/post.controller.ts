import { Controller } from '@nestjs/common';

import { TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';

import { apiBlog } from 'api-contracts';

import { MultipartFile } from '@fastify/multipart';

import { MediaEntity, Post } from '@prisma/client/blog';

import { isNil } from 'lodash';

import { PostService } from '../services';

import { isValidFile } from '../../media/constraints';
import { MediaService } from '../../media/services';
import { PermissionChecker } from '../../rbac/types';
import { PermissionAction } from '../../rbac/constants';
import { Permission } from '../../rbac/decorators';
import { getTime } from '../../core/helpers';
// import { PostService } from '../services/post.service';
const c = nestControllerContract(apiBlog.content);

const testChecker: PermissionChecker = async (ab) => ab.can(PermissionAction.MANAGE, 'all');

@Controller()
export class ContentController {
    constructor(
        private readonly postService: PostService,
        private readonly mediaService: MediaService,
    ) {}

    @Permission(testChecker)
    @TsRestHandler(c.testGet)
    async getTest() {
        return tsRestHandler(c.testGet, async () => {
            return { status: 200, body: `${await getTime()}test success` };
        });
    }

    @TsRestHandler(c.getPostById)
    async getPostById() {
        return tsRestHandler(c.getPostById, async ({ params: { id } }) => {
            const post = await this.postService.post({ id: String(id) });
            if (post === null) {
                return { status: 404 as const, body: null };
            }
            return { status: 200 as const, body: post };
        });
    }

    @TsRestHandler(c.getPostBySlug)
    async getPostBySlug() {
        return tsRestHandler(c.getPostBySlug, async ({ params }) => {
            const post = await this.postService.post({ slug: String(params.slug) });
            if (post === null) {
                return { status: 404 as const, body: null };
            }
            return { status: 200 as const, body: post };
        });
    }

    @TsRestHandler(c.getPosts)
    async getPosts() {
        return tsRestHandler(c.getPosts, async ({ query: { take, skip } }) => {
            const { posts, total } = await this.postService.posts({
                take,
                skip,
                orderBy: {
                    createdAt: 'desc',
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
                ? { tags: { set: this.extractArrayValue(data.tags) } }
                : {}),
        };

        if (method === 'create') {
            return this.postService.createPost(postData);
        }
        if (method === 'update') {
            return this.postService.updatePost({
                where: {
                    id,
                },
                data: postData,
            });
        }
        return undefined;
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

    // TODO 封装整合
    extractStringValue(value: string | any): string {
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
}
