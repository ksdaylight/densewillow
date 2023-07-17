import { Controller } from '@nestjs/common';

import { TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';

import { apiBlog } from 'api-contracts';

import { MultipartFile } from '@fastify/multipart';

import { MediaEntity, Post } from '@prisma/client/blog';

import { isNil } from 'lodash';

import { PostService } from '../services';

import { isValidFile } from '../../media/constraints';
import { MediaService } from '../../media/services';
// import { PostService } from '../services/post.service';
const c = nestControllerContract(apiBlog.content);

@Controller()
export class MediaController {
    constructor(
        private readonly postService: PostService,
        private readonly mediaService: MediaService,
    ) {}

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
        return tsRestHandler(c.getPostBySlug, async ({ params: { slug } }) => {
            const post = await this.postService.post({ slug: String(slug) });
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

    // 封装文件有效性检查函数
    async checkFile(file: MultipartFile): Promise<boolean> {
        return isValidFile(file, {
            mimetypes: ['image/png', 'image/gif', 'image/jpeg', 'image/webp', 'image/svg+xml'],
            fileSize: 1024 * 1024 * 5,
        });
    }

    // 封装文件上传函数
    async uploadFile(file: MultipartFile): Promise<MediaEntity> {
        return this.mediaService.upload({
            file,
            dir: 'thumbnail',
        });
    }

    // 封装文章数据创建或更新函数
    async createOrUpdatePost(
        data: any,
        method: string,
        thumbnailId?: string,
        id?: string,
    ): Promise<Post> {
        const postData = {
            title: this.extractStringValue(data.title),
            slug: this.extractStringValue(data.slug),
            ...(data.content !== undefined
                ? { content: this.extractStringValue(data.content) }
                : {}),
            meta: this.extractStringValue(data.meta),
            ...(!isNil(thumbnailId)
                ? {
                      connect: { id: thumbnailId },
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
                    id: this.extractStringValue(id),
                },
                data: postData,
            });
        }
        return undefined;
    }

    // 使用封装的函数重构 createPost 和 updatePost
    @TsRestHandler(c.createPost)
    async createPost() {
        return tsRestHandler(c.createPost, async (body) => {
            const data = body.body;
            let imageId = null;
            try {
                if (!isNil(data.image)) {
                    if (!(await this.checkFile(data.image as MultipartFile))) {
                        return { status: 400, body: { message: '请上传5M以内的，图片格式的文件' } };
                    }
                    const imageEntity = await this.uploadFile(data.image as MultipartFile);
                    imageId = imageEntity.id;
                }
                const post = await this.createOrUpdatePost(
                    data,
                    !isNil(imageId) ? imageId : undefined,
                    'create',
                );
                return { status: 201 as const, body: post };
            } catch (error) {
                return { status: 400 as const, body: { message: 'internal error' } };
            }
        });
    }

    @TsRestHandler(c.updatePost)
    async updatePost() {
        return tsRestHandler(c.updatePost, async ({ body: reqData }) => {
            try {
                let imageId = null;
                if (!isNil(reqData.image)) {
                    if (!(await this.checkFile(reqData.image as MultipartFile))) {
                        return { status: 400, body: { message: '请上传5M以内的，图片格式的文件' } };
                    }
                    const imageEntity = await this.uploadFile(reqData.image as MultipartFile);
                    imageId = imageEntity.id;
                }
                const post = await this.createOrUpdatePost(
                    reqData,
                    !isNil(imageId) ? imageId : undefined,
                    'update',
                    this.extractStringValue(reqData.id),
                );
                return { status: 201 as const, body: post };
            } catch (error) {
                return { status: 400 as const, body: { message: 'internal error' } };
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

    extractStringValue(value: string | any): string {
        if (typeof value === 'string') {
            return value;
        }
        return value.value as string;
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
