import { Controller } from '@nestjs/common';

import { TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';

import { apiBlog } from 'api-contracts';

import { PostService } from '../services';

// import { PostService } from '../services/post.service';
const c = nestControllerContract(apiBlog.content);

@Controller()
export class MediaController {
    constructor(private readonly postService: PostService) {}

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

    @TsRestHandler(c.createPost)
    async createPost() {
        return tsRestHandler(c.createPost, async (body) => {
            // console.log(body);
            // console.log('\n');
            const data = body.body;
            try {
                const post = await this.postService.createPost({
                    title: this.extractStringValue(data.title),
                    slug: this.extractStringValue(data.slug),
                    ...(data.content !== undefined
                        ? { content: this.extractStringValue(data.content) }
                        : {}),
                    meta: this.extractStringValue(data.meta),
                    ...(data.tags !== undefined
                        ? { tags: { set: this.extractArrayValue(data.tags) } }
                        : {}),
                });
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
                const post = await this.postService.updatePost({
                    where: {
                        id: this.extractStringValue(reqData.id),
                    },
                    data: {
                        title: this.extractStringValue(reqData.title),
                        slug: this.extractStringValue(reqData.slug),
                        ...(reqData.content !== undefined
                            ? { content: this.extractStringValue(reqData.content) }
                            : {}),
                        meta: this.extractStringValue(reqData.meta),
                        ...(reqData.tags !== undefined
                            ? { tags: { set: this.extractArrayValue(reqData.tags) } }
                            : {}),
                    },
                });
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
