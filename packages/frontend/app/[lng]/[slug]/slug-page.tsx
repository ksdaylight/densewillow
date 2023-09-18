'use client';

import { FC, useCallback, useEffect, useState } from 'react';

import { isNil } from 'lodash';

import Link from 'next/link';

import PostBody from '@frontend/components/common/PostBody';

import PostHero from '@frontend/components/common/PostHero';

import PaddingContainer from '@frontend/components/layout/padding-container';

import LikeHeart from '@frontend/components/common/LikeHeart';

import AuthorInfo from '@frontend/components/common/AuthorInfo';
import Comments from '@frontend/components/common/Comments';

import DefaultLayout from '@frontend/components/layout/DefaultLayout';
import omit from 'lodash/omit';
import Share from '@frontend/components/common/Share';
import { apiClient } from '@frontend/utils/helps';

const host = 'https://densewillow.com';

interface Props {
    initialSlug?: string;
    lng?: string;
}
const PostSlugPage: FC<Props> = ({ initialSlug, lng }): JSX.Element => {
    // const { t } = useTranslation(lng, 'client-page');
    const [likes, setLikes] = useState({ likedByOwner: false, count: 0 });
    const [liking, setLiking] = useState(false);
    const { data: postData } = apiClient.content.getPostBySlug.useQuery(
        ['getPostBySlug', initialSlug || ''],
        {
            params: { slug: initialSlug || '' },
        },
        {
            enabled: false,
        },
    );

    const { id, title, content, meta, author, slug, relatedPosts } = postData!.body;

    const getLikeLabel = useCallback((): string => {
        const { likedByOwner, count } = likes;

        if (likedByOwner && count === 1) return 'You liked this post.';
        if (likedByOwner) return `You and ${count - 1} other likes this post.`;

        if (count === 0) return 'Like post.';

        return `${count} people liked this post.`;
    }, [likes]);

    const { mutate: updatePostLikeMutate } = apiClient.content.updatePostLike.useMutation({
        onSuccess(data, variables, context) {
            setLikes({ likedByOwner: !likes.likedByOwner, count: data.body.newLikes });
        },
        onError(error, variables, context) {
            console.log(error);
        },
    });

    const handleOnLikeClick = async () => {
        setLiking(true);

        updatePostLikeMutate({
            body: {
                postId: id,
            },
        });
        setLiking(false);
        return undefined;
    };

    const {
        data: postStatusData,
        isError: isQueryError,
        error: queryError,
    } = apiClient.content.getPostLikeStatus.useQuery(
        ['likeStatus', '1'],
        {
            query: {
                postId: id,
            },
        },
        {
            enabled: !!id,
        },
    );
    if (isQueryError) {
        console.log(queryError.body);
    }
    useEffect(() => {
        if (!id) return;
        if (!isNil(postStatusData)) {
            setLikes({
                likedByOwner: postStatusData.body.likedByOwner,
                count: postStatusData.body.likesCount,
            });
        }
    }, [postStatusData, id]);

    if (!postData) {
        return <>nothing</>;
    }
    return (
        <>
            <DefaultLayout title={title} desc={meta} lng={lng}>
                <PaddingContainer>
                    <div className="space-y-10">
                        <PostHero post={omit(postData.body, ['relatedPosts'])} />
                        <div className="flex flex-col gap-10 md:flex-row">
                            <div className="relative">
                                <div className="sticky flex items-center gap-5 md:flex-col top-20">
                                    <div className="font-medium md:hidden">Share this content:</div>
                                    <Share url={`${host}/${slug}`} />
                                </div>
                            </div>
                            <PostBody body={content || ''} />
                        </div>

                        <div>
                            <LikeHeart
                                liked={likes.likedByOwner}
                                label={getLikeLabel()}
                                onClick={!liking ? handleOnLikeClick : undefined}
                                busy={liking}
                            />
                        </div>

                        <div>{author && <AuthorInfo profile={author} />}</div>

                        <div>
                            <h3 className="text-xl font-semibold bg-secondary-dark text-primary p-2 mb-4">
                                Related Posts:
                            </h3>

                            <div className="flex flex-col space-y-4">
                                {relatedPosts?.map((p) => {
                                    return (
                                        <Link
                                            key={p.slug}
                                            href={p.slug}
                                            className="font-semibold text-primary-dark dark:text-primary hover:underline"
                                        >
                                            {p.title}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        <Comments belongsTo={id} />
                    </div>
                </PaddingContainer>
            </DefaultLayout>
        </>
    );
};

export default PostSlugPage;
