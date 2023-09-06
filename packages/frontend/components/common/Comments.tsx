'use client';

import { FC, useEffect, useState } from 'react';

import { isNil } from 'lodash';

// import { CommentResponse } from '@frontend/utils/types';
import { CommentWithPartialRelationsAddReplies } from '@api-contracts';

import { apiClient } from '@frontend/app/[lng]/page';

import { useRoleInfoContext } from '@frontend/context/role-info';

import { GitHubAuthButton } from '../button';

import CommentCard from './CommentCard';
import CommentForm from './CommentForm';
import ConfirmModal from './ConfirmModal';
import PageNavigator from './PageNavigator';

interface Props {
    belongsTo?: string;
    fetchAll?: boolean;
}

const limit = 5;
// const currentPageNo = 0;

const Comments: FC<Props> = ({ belongsTo, fetchAll = false }): JSX.Element => {
    const [comments, setComments] = useState<CommentWithPartialRelationsAddReplies[]>();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    // const [reachedToEnd, setReachedToEnd] = useState(false);
    const [busyCommentLike, setBusyCommentLike] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [selectedComment, setSelectedComment] =
        useState<CommentWithPartialRelationsAddReplies | null>(null);
    const [commentToDelete, setCommentToDelete] =
        useState<CommentWithPartialRelationsAddReplies | null>(null);

    const { userInfoLocal } = useRoleInfoContext();

    const insertNewReplyComments = (reply: CommentWithPartialRelationsAddReplies) => {
        if (!comments) return;
        const updatedComments = [...comments];

        const chiefCommentIndex = updatedComments.findIndex(({ id }) => id === reply.repliedToID);
        const { replies } = updatedComments[chiefCommentIndex];
        if (replies) {
            updatedComments[chiefCommentIndex].replies = [...replies, reply];
        } else {
            updatedComments[chiefCommentIndex].replies = [reply];
        }

        setComments([...updatedComments]);
    };

    const updateEditedComment = (newComment: CommentWithPartialRelationsAddReplies) => {
        if (!comments) return;

        const updatedComments = [...comments];

        // To update the we can only change the content
        // if edited comment is chief
        if (newComment.chiefComment) {
            const index = updatedComments.findIndex(({ id }) => id === newComment.id);
            updatedComments[index].content = newComment.content;
        }
        // otherwise updating comment from replies
        else {
            const chiefCommentIndex = updatedComments.findIndex(
                ({ id }) => id === newComment.repliedToID,
            );

            let newReplies = updatedComments[chiefCommentIndex].replies;
            newReplies = newReplies?.map((comment) => {
                if (comment.id === newComment.id) comment.content = newComment.content;
                return comment;
            });

            updatedComments[chiefCommentIndex].replies = newReplies;
        }

        setComments([...updatedComments]);
    };

    const updateDeletedComments = (deletedComment: CommentWithPartialRelationsAddReplies) => {
        if (!comments) return;
        let newComments = [...comments];

        if (deletedComment.chiefComment)
            newComments = newComments.filter(({ id }) => id !== deletedComment.id);
        else {
            const chiefCommentIndex = newComments.findIndex(
                ({ id }) => id === deletedComment.repliedToID,
            );
            const newReplies = newComments[chiefCommentIndex].replies?.filter(
                ({ id }) => id !== deletedComment.id,
            );
            newComments[chiefCommentIndex].replies = newReplies;
        }

        setComments([...newComments]);
    };

    const updateLikedComments = (likedComment: CommentWithPartialRelationsAddReplies) => {
        if (!comments) return;
        let newComments = [...comments];

        if (likedComment.chiefComment) {
            newComments = newComments.map((comment) => {
                if (comment.id === likedComment.id) return likedComment;
                return comment;
            });
        } else {
            const chiefCommentIndex = newComments.findIndex(
                ({ id }) => id === likedComment.repliedToID,
            );
            const newReplies = newComments[chiefCommentIndex].replies?.map((reply) => {
                if (reply.id === likedComment.id) return likedComment;
                return reply;
            });
            newComments[chiefCommentIndex].replies = newReplies;
        }

        setComments([...newComments]);
    };

    const { mutate: addChiefCommentMutate } = apiClient.content.createChiefComment.useMutation({
        onSuccess: (data, variables, context) => {
            const newComment = data.body;
            if (newComment && comments) setComments([...comments, newComment]);
            else setComments([newComment]);
        },
        onError: (error, variables, context) => {
            console.log(error);
        },
    });

    const handleNewCommentSubmit = async (content: string) => {
        setSubmitting(true);
        if (!isNil(belongsTo)) {
            addChiefCommentMutate({
                body: {
                    content,
                    belongsTo,
                },
            });
        } else {
            console.log('no belongs to !!');
        }
        setSubmitting(false);
    };

    const { mutate: addReplyMutate } = apiClient.content.addReplay.useMutation({
        onSuccess: (data, variables, context) => {
            insertNewReplyComments(data.body);
        },
        onError: (error, variables, context) => {
            console.log(error);
        },
    });

    const handleReplySubmit = (replyComment: { content: string; repliedTo: string }) => {
        addReplyMutate({
            body: replyComment,
        });
    };

    const { mutate: updateMutate } = apiClient.content.updateComment.useMutation({
        onSuccess: (data, variables, context) => {
            updateEditedComment(data.body);
        },
        onError: (error, variables, context) => {
            console.log(error);
        },
    });

    const handleUpdateSubmit = (content: string, id: string) => {
        updateMutate({
            body: {
                id,
                content,
            },
        });
    };
    const handleOnDeleteClick = (comment: CommentWithPartialRelationsAddReplies) => {
        setCommentToDelete(comment);
        setShowConfirmModal(true);
    };

    const handleOnDeleteCancel = () => {
        setCommentToDelete(null);
        setShowConfirmModal(false);
    };

    const { mutate: deleteMutate } = apiClient.content.deleteComment.useMutation({
        onSuccess: (data, variables, context) => {
            if (data.status === 200) {
                if (commentToDelete) updateDeletedComments(commentToDelete);
            }
            setBusyCommentLike(false);
            setSelectedComment(null);
        },
        onError: (error, variables, context) => {
            console.log(error);
        },
        onSettled: () => {
            setCommentToDelete(null);
            setShowConfirmModal(false);
        },
    });

    const handleOnDeleteConfirm = () => {
        if (!commentToDelete) return;
        deleteMutate({
            params: {
                id: commentToDelete.id,
            },
        });
    };
    const { mutate: updateLikeMutate } = apiClient.content.updateLike.useMutation({
        onSuccess(data, variables, context) {
            // data.body?.replies[0].owner;
            updateLikedComments(data.body);
            setSelectedComment(null);
        },
        onError(error, variables, context) {
            console.log(error);
            setSelectedComment(null);
        },
        onSettled() {
            setBusyCommentLike(false);
        },
    });
    const handleOnLikeClick = (comment: CommentWithPartialRelationsAddReplies) => {
        setBusyCommentLike(true);
        setSelectedComment(comment);
        updateLikeMutate({
            body: {
                id: comment.id,
            },
        });
    };

    const {
        data: allCommentsData,
        // isFetching,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
    } = apiClient.content.getComments.useInfiniteQuery(
        ['getComments', '1'],
        ({ pageParam = { skip: 0, take: limit } }) => ({
            query: { skip: pageParam.skip, take: pageParam.take },
        }),
        {
            enabled: fetchAll,
            // staleTime: 60000,
            getNextPageParam: (lastPage, allPages) => {
                if (lastPage.status === 200) {
                    if (lastPage.body.count > allPages.length * limit) {
                        return { take: limit, skip: allPages.length * limit };
                    }
                    return undefined;
                }
                return undefined;
            },
        },
    );

    const handleOnNextClick = () => {
        if (hasNextPage) fetchNextPage();
    };

    const handleOnPrevClick = () => {
        if (hasPreviousPage) fetchPreviousPage();
    };

    useEffect(() => {
        if (!belongsTo && fetchAll) {
            if (allCommentsData?.pages) {
                const newComments = allCommentsData.pages.flatMap((page) => page.body.comments);
                setComments(newComments);
            }
        }
    }, [allCommentsData, hasNextPage, belongsTo, fetchAll]);

    const { data: commentsByBelongsData, isError } = apiClient.content.getCommentsByPostId.useQuery(
        ['comments', belongsTo],
        {
            query: {
                take: String(100),
                skip: String(0),
                belongsTo: belongsTo || '',
            },
        },
        {
            enabled: !!belongsTo, // Only run the query if belongsTo is defined
        },
    );

    useEffect(() => {
        if (!belongsTo) return;
        if (!isNil(commentsByBelongsData)) {
            setComments(commentsByBelongsData.body.comments);
        }
    }, [commentsByBelongsData, belongsTo]);

    if (isError) console.log('An error occurred');

    return (
        <div className="py-20 space-y-4">
            {userInfoLocal.role !== 'guest' ? (
                <CommentForm
                    visible={!fetchAll}
                    onSubmit={handleNewCommentSubmit}
                    title="Add comment"
                    busy={submitting}
                />
            ) : (
                <div className="flex flex-col items-end space-y-2">
                    <h3 className="text-secondary-dark text-xl font-semibold">
                        Log in to add comment
                    </h3>
                    <GitHubAuthButton />
                </div>
            )}

            {comments?.map((comment) => {
                const { replies } = comment;
                return (
                    <div key={comment.id}>
                        <CommentCard
                            comment={comment}
                            showControls={userInfoLocal?.id === comment.owner?.id}
                            onReplySubmit={(content) =>
                                handleReplySubmit({ content, repliedTo: comment.id })
                            }
                            onUpdateSubmit={(content) => handleUpdateSubmit(content, comment.id)}
                            onDeleteClick={() => handleOnDeleteClick(comment)}
                            onLikeClick={() => handleOnLikeClick(comment)}
                            busy={selectedComment?.id === comment.id && busyCommentLike}
                        />

                        {replies?.length ? (
                            <div className="w-[93%] ml-auto space-y-3">
                                <h1 className="text-secondary-dark mb-3">Replies</h1>
                                {replies.map((reply) => {
                                    return (
                                        <CommentCard
                                            key={reply.id}
                                            comment={reply}
                                            showControls={userInfoLocal?.id === reply.owner?.id}
                                            onReplySubmit={(content) =>
                                                handleReplySubmit({
                                                    content,
                                                    repliedTo: comment.id,
                                                })
                                            }
                                            onUpdateSubmit={(content) =>
                                                handleUpdateSubmit(content, reply.id)
                                            }
                                            onDeleteClick={() => handleOnDeleteClick(reply)}
                                            onLikeClick={() => handleOnLikeClick(reply)}
                                            busy={
                                                selectedComment?.id === reply.id && busyCommentLike
                                            }
                                        />
                                    );
                                })}
                            </div>
                        ) : null}
                    </div>
                );
            })}
            {fetchAll ? (
                <div className="py-10 flex justify-end">
                    <PageNavigator
                        onNextClick={handleOnNextClick}
                        onPrevClick={handleOnPrevClick}
                    />
                </div>
            ) : null}

            <ConfirmModal
                visible={showConfirmModal}
                title="Are you sure?"
                subTitle="This action will remove this comment and replies if this is chief comment!"
                onCancel={handleOnDeleteCancel}
                onConfirm={handleOnDeleteConfirm}
            />
        </div>
    );
};

export default Comments;
