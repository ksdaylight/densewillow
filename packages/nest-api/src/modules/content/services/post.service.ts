import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma, Post } from '@prisma/client/blog';

import { isNil } from 'lodash';

import { Configure } from '../../core/configure';
import { PrismaService } from '../../core/providers';
import { UserService } from '../../user/services';

@Injectable()
export class PostService {
    constructor(
        protected configure: Configure,
        protected prisma: PrismaService,
        protected readonly userService: UserService,
    ) {}

    async getPostUnique(
        postWhereUniqueInput: Prisma.PostWhereUniqueInput,
        include?: Prisma.PostInclude,
    ) {
        return this.prisma.post.findUnique({
            where: postWhereUniqueInput,
            include,
        });
    }

    async findUniqueOrThrowWithRelatedPosts(args: Prisma.PostFindUniqueOrThrowArgs) {
        const post = await this.prisma.post.findUniqueOrThrow(args);
        const relatedPosts = await this.findRelatePosts(post);
        const author = await this.userService.getAuthorInfo(post.authorId || undefined);
        return {
            ...post,
            author,
            relatedPosts,
        };
    }

    async getPostLikeStatus(postWhereUniqueInput: Prisma.PostWhereUniqueInput, userId?: string) {
        const post = await this.prisma.post.findUniqueOrThrow({
            where: postWhereUniqueInput,
            include: {
                likedUsers: true,
            },
        });

        const likesCount = post.likedUsers.length;
        const likedByOwner = userId
            ? post.likedUsers.map((item) => item.userId).includes(userId)
            : false;
        return {
            likesCount,
            likedByOwner,
        };
    }

    async updateLike(params: { postUniqueWhere: Prisma.PostWhereUniqueInput; userId: string }) {
        const oldPost = await this.prisma.post.findUniqueOrThrow({
            where: params.postUniqueWhere,
            include: { likedUsers: true },
        });
        if (isNil(oldPost)) throw NotFoundException;
        const oldLikes = oldPost.likedUsers.map((item) => item.userId) || [];
        const likedBy = params.userId;

        const updatedPost = await this.prisma.post.update({
            where: { id: oldPost.id },
            data: {
                likedUsers: {
                    ...(oldLikes.includes(likedBy)
                        ? {
                              delete: {
                                  userId_postId: {
                                      userId: likedBy,
                                      postId: oldPost.id,
                                  },
                              },
                          }
                        : {
                              create: {
                                  assignedBy: likedBy,
                                  assignedAt: new Date(),
                                  user: {
                                      connect: {
                                          id: likedBy,
                                      },
                                  },
                              },
                          }),
                },
            },
            include: {
                likedUsers: true,
            },
        });

        if (isNil(updatedPost)) throw NotFoundException;

        return updatedPost;
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

    async addOrUpdatePostTranslation(params: {
        where: Prisma.PostWhereUniqueInput;
        data: Prisma.PostUpdateInput;
        lng: string;
        select?: Prisma.PostSelect;
    }): Promise<Post> {
        const { data, where, select, lng } = params;
        const postWithTranslations = await this.prisma.post.findUniqueOrThrow({
            where,
            select: {
                translations: true,
            },
        });
        const matchingTranslation = postWithTranslations.translations.find(
            (translation) => translation.language === lng,
        );

        if (matchingTranslation) {
            const translationId = matchingTranslation.id;
            await this.prisma.translation.update({
                where: {
                    id: translationId,
                },
                data: {
                    title: data.title,
                    content: data.content,
                    meta: data.meta,
                },
            });
        } else {
            await this.prisma.post.update({
                where,
                data: {
                    translations: {
                        create: {
                            language: lng,
                            title: data.title as string,
                            content: data.content as string,
                            meta: data.meta as string,
                        },
                    },
                },
            });
        }
        return this.prisma.post.findUniqueOrThrow({
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
