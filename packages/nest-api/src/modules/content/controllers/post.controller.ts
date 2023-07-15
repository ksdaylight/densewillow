import { Controller, Req } from '@nestjs/common';

import {
    NestRequestShapes,
    TsRestHandler,
    nestControllerContract,
    tsRestHandler,
} from '@ts-rest/nest';

import { apiBlog } from 'api-contracts';

import { PostService } from '../services';

// import { PostService } from '../services/post.service';
const c = nestControllerContract(apiBlog.content);

type RequestShapes = NestRequestShapes<typeof c>;
@Controller()
export class MediaController {
    constructor(private readonly postService: PostService) {}

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
        return tsRestHandler(
            c.getFilteredPosts,
            async ({ params: { searchString } }: RequestShapes['getFilteredPosts']) => {
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
            },
        );
    }

    @TsRestHandler(c.createPost)
    async createPost(@Req() { body: bodyOrginal }: RequestShapes['createPost']) {
        // const post = await this.postService.createPost({
        //     title: body.title,
        //     content: body.content,
        //     author: {
        //         connect: { email: body.authorEmail },
        //     },
        // });
        return tsRestHandler(c.createPost, async (body) => {
            console.log(body.body.title);
            console.log('\n');
            console.log(bodyOrginal);
            return { status: 201 as const, body: { message: 'hhh ' } };
        });
        // return { status: 201 as const, body: post };
    }
    // TODO update

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
