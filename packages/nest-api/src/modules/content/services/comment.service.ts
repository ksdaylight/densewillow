import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma, Comment } from '@prisma/client/blog';

import { isNil } from 'lodash';

import { Configure } from '../../core/configure';
import { PrismaService } from '../../core/providers';

@Injectable()
export class CommentService {
    constructor(protected configure: Configure, protected prisma: PrismaService) {}

    async comment(
        commentWhereUniqueInput: Prisma.CommentWhereUniqueInput,
        include?: Prisma.CommentInclude,
    ) {
        return this.prisma.comment.findUnique({
            where: commentWhereUniqueInput,
            include,
            // : {
            //     owner: true,
            //     likes: true,
            //     replyTo: true,
            //     replies: true,
            // },
        });
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

    formatComment = async (comment: Comment, userId?: string) => {
        const owner = await this.prisma.user.findUniqueOrThrow({ where: { id: comment.ownerId } });
        return {
            id: comment.id,
            content: comment.content,
            likes: comment.likedByUserIDs.length,
            chiefComment: comment?.chiefComment || false,
            createdAt: comment.createdAt?.toString(),
            owner: { id: owner.id, name: owner.name, avatar: owner.avatar },
            repliedTo: comment?.repliedToID,
            likedByOwner: userId ? comment.likedByUserIDs.includes(userId) : false,
        };
    };

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
