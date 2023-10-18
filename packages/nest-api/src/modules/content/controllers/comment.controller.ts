import { Controller } from '@nestjs/common';

import { TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';

import { apiBlog } from '@api-contracts';

import { User } from '@prisma/client/blog';

import { CommentService } from '../services';

import { Guest, ReqUser } from '../../user/decorators';
// import { PostService } from '../services/post.service';
const c = nestControllerContract(apiBlog.content);

// const testChecker: PermissionChecker = async (ab) => ab.can(PermissionAction.MANAGE, 'all');
// TODO deprecated all 集成 Waline
@Controller()
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Guest()
    @TsRestHandler(c.getCommentsByPostId, { jsonQuery: true })
    async getCommentByPost(@ReqUser() user: ClassToPlain<User>) {
        return tsRestHandler(
            c.getCommentsByPostId,
            async ({ query: { take, skip, belongsTo } }) => {
                const { comments, total } = await this.commentService.comments({
                    take,
                    skip,
                    orderBy: {
                        createdAt: 'desc',
                    },
                    where: {
                        belongsToId: belongsTo,
                    },
                    include: {
                        owner: true,
                        belongsTo: true,
                        likes: true,
                        replies: {
                            include: {
                                owner: true,
                            },
                        },
                    },
                });
                return {
                    status: 200 as const,
                    body: { comments, count: total, skip, take },
                };
            },
        );
    }

    @Guest()
    @TsRestHandler(c.getComments)
    async getComments(@ReqUser() user: ClassToPlain<User>) {
        return tsRestHandler(c.getComments, async ({ query: { take, skip } }) => {
            const { comments, total } = await this.commentService.comments({
                take,
                skip,
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    owner: true,
                    replies: {
                        include: {
                            owner: true,
                        },
                    },
                    belongsTo: true,
                },
            });

            return {
                status: 200 as const,
                body: { comments, count: total, skip, take },
            };
        });
    }

    @TsRestHandler(c.createChiefComment)
    async createChiefComment(@ReqUser() user: ClassToPlain<User>) {
        return tsRestHandler(c.createChiefComment, async ({ body }) => {
            try {
                const newComment = await this.commentService.createComment(
                    {
                        content: body.content,
                        belongsTo: { connect: { id: body.belongsTo } },
                        owner: { connect: { id: user.id } },
                        chiefComment: true,
                    },
                    {
                        owner: true,
                        replies: {
                            include: {
                                owner: true,
                            },
                        },
                        belongsTo: true,
                    },
                );
                return { status: 201 as const, body: newComment };
            } catch (error) {
                return { status: 400 as const, body: { message: `${(error as Error).message}` } };
            }
        });
    }

    @TsRestHandler(c.addReplay)
    async createReplay(@ReqUser() user: ClassToPlain<User>) {
        return tsRestHandler(c.addReplay, async ({ body }) => {
            try {
                const newComment = await this.commentService.createComment(
                    {
                        content: body.content,
                        replyTo: { connect: { id: body.repliedTo } },
                        owner: { connect: { id: user.id } },
                    },
                    {
                        owner: true,
                        replies: {
                            include: {
                                owner: true,
                            },
                        },
                        belongsTo: true,
                    },
                );
                return { status: 201 as const, body: newComment };
            } catch (error) {
                return { status: 400 as const, body: { message: `${(error as Error).message}` } };
            }
        });
    }

    @TsRestHandler(c.updateComment)
    async updateComment(@ReqUser() user: ClassToPlain<User>) {
        return tsRestHandler(c.updateComment, async ({ body }) => {
            try {
                const newComment = await this.commentService.updateComment({
                    where: { id: body.id },
                    data: {
                        content: body.content,
                    },
                    include: {
                        owner: true,
                        replies: {
                            include: {
                                owner: true,
                            },
                        },
                        belongsTo: true,
                    },
                });
                return { status: 201 as const, body: newComment };
            } catch (error) {
                return { status: 400 as const, body: { message: `${(error as Error).message}` } };
            }
        });
    }

    @TsRestHandler(c.updateLike)
    async updateLike(@ReqUser() user: ClassToPlain<User>) {
        return tsRestHandler(c.updateLike, async ({ body }) => {
            try {
                return {
                    status: 201 as const,
                    body: await this.commentService.updateLike({
                        commentUniqueWhere: { id: body.id },
                        userId: user.id,
                    }),
                };
            } catch (error) {
                return { status: 400 as const, body: { message: `${(error as Error).message}` } };
            }
        });
    }

    @TsRestHandler(c.deleteComment)
    async deleteComment() {
        return tsRestHandler(c.deleteComment, async ({ params: { id } }) => {
            await this.commentService.deleteComment({ id: String(id) });
            return { status: 200 as const, body: { message: 'Comment Deleted' } };
        });
    }
}
