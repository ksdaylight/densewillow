import { Controller } from '@nestjs/common';

import { TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';

import { apiBlog } from '@api-contracts';

import { User, Comment, Post } from '@prisma/client/blog';

import { CommentService } from '../services';

import { Guest, ReqUser } from '../../user/decorators';
// import { PostService } from '../services/post.service';
const c = nestControllerContract(apiBlog.content);

// const testChecker: PermissionChecker = async (ab) => ab.can(PermissionAction.MANAGE, 'all');

@Controller()
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Guest()
    @TsRestHandler(c.getCommentsByPostId)
    async getCommentByPost() {
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
                        replies: {
                            include: {
                                owner: true,
                            },
                        },
                    },
                });
                const formattedComments = await Promise.all(
                    comments.map((comment) => this.formatCommentAndReplies(comment)),
                );

                return {
                    status: 200 as const,
                    body: { comments: formattedComments, count: total, skip, take },
                };
            },
        );
    }

    @Guest() // TODO add admin permission
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

            const formattedComments = await Promise.all(
                comments.map((comment) => this.formatCommentAndReplies(comment, user.id)),
            );

            return {
                status: 200 as const,
                body: { comments: formattedComments, count: total, skip, take },
            };
        });
    }

    async formatCommentAndReplies(
        comment: Comment & { replies?: Comment[] } & { belongsTo?: Post },
        userId?: string,
    ) {
        const formattedComment = await this.commentService.formatComment(comment, userId);
        const formattedReplies = comment.replies
            ? await Promise.all(
                  comment.replies.map(async (reply: Comment) =>
                      this.commentService.formatComment(reply, userId),
                  ),
              )
            : [];

        return {
            ...formattedComment,
            replies: formattedReplies,
            belongsTo: {
                id: comment.belongsTo.id,
                title: comment.belongsTo.title,
                slug: comment.belongsTo.slug,
            },
        };
    }

    @TsRestHandler(c.createChiefComment)
    async createChiefComment(@ReqUser() user: ClassToPlain<User>) {
        return tsRestHandler(c.createChiefComment, async ({ body }) => {
            try {
                const newComment = await this.commentService.createComment({
                    content: body.content,
                    belongsTo: { connect: { id: body.belongsTo } },
                    owner: { connect: { id: user.id } },
                    chiefComment: true,
                });
                const comment = await this.commentService.formatComment(newComment, user.id);
                return { status: 201 as const, body: comment };
            } catch (error) {
                return { status: 400 as const, body: { message: `${(error as Error).message}` } };
            }
        });
    }

    @TsRestHandler(c.addReplay)
    async createReplay(@ReqUser() user: ClassToPlain<User>) {
        return tsRestHandler(c.addReplay, async ({ body }) => {
            try {
                const newComment = await this.commentService.createComment({
                    content: body.content,
                    replyTo: { connect: { id: body.repliedTo } },
                    owner: { connect: { id: user.id } },
                });
                const comment = await this.commentService.formatComment(newComment, user.id);
                return { status: 201 as const, body: comment };
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
                });
                const comment = await this.commentService.formatComment(newComment, user.id);
                return { status: 201 as const, body: comment };
            } catch (error) {
                return { status: 400 as const, body: { message: `${(error as Error).message}` } };
            }
        });
    }

    @TsRestHandler(c.updateLike)
    async updateLike(@ReqUser() user: ClassToPlain<User>) {
        return tsRestHandler(c.updateLike, async ({ body }) => {
            try {
                const oldComment = await this.commentService.comment({
                    id: body.id,
                });
                const oldLikes = oldComment.likedByUserIDs || [];
                const likedBy = user.id;

                // // like and unlike
                // // this is for unlike
                // if (oldLikes.includes(likedBy)) {
                //     await this.commentService.updateComment({
                //         where: { id: oldComment.id },
                //         data: {
                //             likes: {
                //                 disconnect: {
                //                     id: likedBy,
                //                 },
                //             },
                //         },
                //     });
                // }
                // // this is to like comment
                // else {
                //     await this.commentService.updateComment({
                //         where: { id: oldComment.id },
                //         data: {
                //             likes: {
                //                 connect: {
                //                     id: likedBy,
                //                 },
                //             },
                //         },
                //     });
                // }
                const operation = oldLikes.includes(likedBy) ? 'disconnect' : 'connect';

                await this.commentService.updateComment({
                    where: { id: oldComment.id },
                    data: {
                        likes: {
                            [operation]: {
                                id: likedBy,
                            },
                        },
                    },
                });

                // const comment = await this.commentService.formatComment(oldComment, user.id);
                const comment = {
                    ...(await this.commentService.formatComment(oldComment, user.id)),
                    replies: oldComment.replies
                        ? await Promise.all(
                              oldComment.replies.map(async (reply: any) =>
                                  this.commentService.formatComment(reply, user.id),
                              ),
                          )
                        : [],
                };
                return { status: 201 as const, body: comment };
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
