import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma, Comment } from '@prisma/client/blog';

import { isNil } from 'lodash';

import { Configure } from '../../core/configure';
import { PrismaService } from '../../core/providers';

@Injectable()
export class CommentService {
    constructor(protected configure: Configure, protected prisma: PrismaService) {}

    async comment(args: Prisma.CommentFindUniqueArgs) {
        return this.prisma.comment.findUnique(args);
    }

    async updateLike(params: {
        commentUniqueWhere: Prisma.CommentWhereUniqueInput;
        userId: string;
    }) {
        const oldComment = await this.prisma.comment.findUniqueOrThrow({
            where: params.commentUniqueWhere,
            include: { likes: true },
        });
        if (isNil(oldComment)) throw NotFoundException;
        const oldLikes = oldComment.likes.map((item) => item.userId) || [];
        const likedBy = params.userId;

        const updatedComment = await this.prisma.comment.update({
            where: { id: oldComment.id },
            data: {
                likes: {
                    ...(oldLikes.includes(likedBy)
                        ? {
                              delete: {
                                  userId_commentId: {
                                      userId: likedBy,
                                      commentId: oldComment.id,
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
                owner: true,
                replies: {
                    include: {
                        owner: true,
                    },
                },
            },
        });

        if (isNil(updatedComment)) throw NotFoundException;

        return updatedComment;
    }

    async comments(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.CommentWhereUniqueInput;
        where?: Prisma.CommentWhereInput;
        orderBy?: Prisma.CommentOrderByWithRelationInput;
        include?: Prisma.CommentInclude;
    }) {
        const { skip, take, cursor, where, orderBy, include } = params;

        const comments = await this.prisma.comment.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include,
        });
        const total = await this.prisma.comment.count({
            where: where || undefined,
        });
        return { comments, total };
    }

    async createComment(
        data: Prisma.CommentCreateInput,
        include?: Prisma.CommentInclude,
    ): Promise<Comment> {
        return this.prisma.comment.create({
            data,
            include,
        });
    }

    async updateComment(params: {
        where: Prisma.CommentWhereUniqueInput;
        data: Prisma.CommentUpdateInput;
        include?: Prisma.CommentInclude;
    }): Promise<Comment> {
        const { data, where, include } = params;
        return this.prisma.comment.update({
            data,
            where,
            include,
        });
    }

    async deleteComment(where: Prisma.CommentWhereUniqueInput): Promise<Comment> {
        const comment = await this.prisma.comment.findUnique({ where });
        if (isNil(comment)) throw new NotFoundException();

        if (comment.chiefComment) {
            await this.prisma.comment.update({
                where: { id: comment.id },
                data: {
                    replies: {
                        set: [],
                    },
                },
            });
            await this.prisma.comment.deleteMany({
                where: { repliedToID: comment.id },
            });
        } else {
            await this.prisma.comment.update({
                where: { id: comment.repliedToID! },
                data: {
                    replies: {
                        disconnect: [{ id: comment.id }],
                    },
                },
            });
        }
        return this.prisma.comment.delete({
            where,
        });
    }
}
