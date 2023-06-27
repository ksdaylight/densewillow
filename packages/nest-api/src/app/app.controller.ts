import { Controller, Req } from '@nestjs/common';

import {
    nestControllerContract,
    NestRequestShapes,
    TsRestHandler,
    tsRestHandler,
} from '@ts-rest/nest';

import { apiBlog } from 'api-contracts';

import { AppService } from './app.service';
import { PostService } from './post.service';

const c = nestControllerContract(apiBlog);
type RequestShapes = NestRequestShapes<typeof c>;

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly postService: PostService,
    ) {}

    @TsRestHandler(c.getPostById)
    async getPostById() {
        return tsRestHandler(
            c.getPostById,
            async ({ params: { id } }: RequestShapes['getPostById']) => {
                const post = await this.postService.post({ id: String(id) });
                if (post === null) {
                    return { status: 404 as const, body: null };
                }
                return { status: 200 as const, body: post };
            },
        );
    }

    @TsRestHandler(c.getPostsAndItems)
    async getPostsAndItems() {
        return tsRestHandler(c.getPostsAndItems, async () => {
            const posts = await this.postService.posts({ where: { published: true } });
            return { status: 200 as const, body: posts };
        });
    }

    @TsRestHandler(c.getFilteredPosts)
    async getFilteredPosts() {
        return tsRestHandler(
            c.getFilteredPosts,
            async ({ params: { searchString } }: RequestShapes['getFilteredPosts']) => {
                const posts = await this.postService.posts({
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
            },
        );
    }

    @TsRestHandler(c.createPost)
    async createPost(@Req() { body }: RequestShapes['createPost']) {
        const post = await this.postService.createPost({
            title: body.title,
            content: body.content,
            author: {
                connect: { email: body.authorEmail },
            },
        });

        return { status: 201 as const, body: post };
    }

    @TsRestHandler(c.publishPost)
    async publishPost() {
        return tsRestHandler(
            c.publishPost,
            async ({ params: { id } }: RequestShapes['publishPost']) => {
                const post = await this.postService.updatePost({
                    where: { id: String(id) },
                    data: { published: true },
                });

                return { status: 200 as const, body: post };
            },
        );
    }

    @TsRestHandler(c.deletePost)
    async deletePost() {
        return tsRestHandler(
            c.deletePost,
            async ({ params: { id } }: RequestShapes['deletePost']) => {
                await this.postService.deletePost({ id: String(id) });
                return { status: 200 as const, body: { message: 'Post Deleted' } };
            },
        );
    }
}
