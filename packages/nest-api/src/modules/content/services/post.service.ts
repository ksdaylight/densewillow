import { Injectable } from '@nestjs/common';

import { Prisma, Post } from '@prisma/client/blog';

import { Configure } from '../../core/configure';
import { PrismaService } from '../../core/providers';

@Injectable()
export class PostService {
    constructor(protected configure: Configure, protected prisma: PrismaService) {}

    async post(postWhereUniqueInput: Prisma.PostWhereUniqueInput, include?: Prisma.PostInclude) {
        return this.prisma.post.findUnique({
            where: postWhereUniqueInput,
            include,
        });
    }

    async findRelatePosts(post: Post) {
        const posts = await this.prisma.post.findMany({
            where: {
                tags: {
                    hasSome: post.tags || [],
                },
                NOT: {
                    id: post.id,
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 5,
        });

        // const relatedPosts = posts.map((p) => ({
        //     id: p.id,
        //     title: p.title,
        //     slug: p.slug,
        // }));
        // return relatedPosts;
        return posts;
    }

    async posts(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PostWhereUniqueInput;
        where?: Prisma.PostWhereInput;
        orderBy?: Prisma.PostOrderByWithRelationInput;
        include?: Prisma.PostInclude;
    }) {
        const { skip, take, cursor, where, orderBy, include } = params;

        const posts = await this.prisma.post.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include,
        });
        const total = await this.prisma.post.count({
            where: where || undefined,
        });
        return { posts, total };
    }

    async createPost(data: Prisma.PostCreateInput): Promise<Post> {
        return this.prisma.post.create({
            data,
        });
    }

    async updatePost(params: {
        where: Prisma.PostWhereUniqueInput;
        data: Prisma.PostUpdateInput;
        select?: Prisma.PostSelect;
    }): Promise<Post> {
        const { data, where, select } = params;
        return this.prisma.post.update({
            data,
            where,
            select,
        });
    }

    async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
        return this.prisma.post.delete({
            where,
        });
    }
}
