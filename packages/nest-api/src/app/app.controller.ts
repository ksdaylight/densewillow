import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { AppService } from './app.service';
import { PostService } from './post.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly postService: PostService,
    ) {}

    @Get()
    getData() {
        return this.appService.getData();
    }

    @Get('post/:id')
    async getPostById(@Param('id') id: string) {
        return this.postService.post({ id: String(id) });
    }

    @Get('feed')
    async getPostsAndItems() {
        const posts = this.postService.posts({ where: { published: true } });

        return posts;
    }

    @Get('filter/:searchString')
    async getFilteredPosts(@Param('searchString') searchString: string) {
        const posts = this.postService.posts({
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

        return posts;
    }

    @Post('post')
    async createdDraft(@Body() postData: { title: string; content?: string; authorEmail: string }) {
        const { title, content, authorEmail } = postData;
        return this.postService.createPost({
            title,
            content,
            author: {
                connect: { email: authorEmail },
            },
        });
    }

    @Put('publish/:id')
    async publishPost(@Param('id') id: string) {
        return this.postService.updatePost({
            where: { id: String(id) },
            data: { published: true },
        });
    }

    @Delete('post/:id')
    async deletePost(@Param('id') id: string) {
        return this.postService.deletePost({ id: String(id) });
    }
}
