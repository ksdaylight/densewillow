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

import Share from '@frontend/components/common/Share'; // 'packages/admin/components/common/Share';

import { apiClient } from '../page';

// import { apiClient, baseApiUrl } from '../admin/page';
const host = 'https://densewillow.com';

interface Props {
    initialSlug?: string;
}
const PostSlugPage: FC<Props> = ({ initialSlug }): JSX.Element => {
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
        // axios(`/api/posts/like-status?postId=${id}`)
        //     .then(({ data }) =>
        //         setLikes({ likedByOwner: data.likedByOwner, count: data.likesCount }),
        //     )
        //     .catch((err) => console.log(err));
    }, [postStatusData, id]);

    if (!postData) {
        return <>nothing</>;
    }
    return (
        <DefaultLayout title={title} desc={meta}>
            <PaddingContainer>
                {/* <div className="lg:px-0 px-3"> */}
                {/* <div className="relative aspect-video">
                    {thumbnail && (
                        <Image
                            src={`${baseApiUrl}/images/${thumbnail.id}${thumbnail.ext}`}
                            alt={title}
                            layout="fill"
                        />
                    )}
                </div>

                <h1 className="text-6xl font-semibold text-primary-dark dark:text-primary py-2">
                    {title}
                </h1>

                <div className="flex items-center justify-between py-2 text-secondary-dark dark:text-secondary-light">
                    {tags.map((t, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <span key={t + index.toString()}>#{t}</span>
                    ))}
                    <span>{dateFormat(createdAt, 'd-mmm-yyyy')}</span>
                </div> */}
                <div className="space-y-10">
                    <PostHero post={postData!.body} />
                    <div className="flex flex-col gap-10 md:flex-row">
                        <div className="relative">
                            <div className="sticky flex items-center gap-5 md:flex-col top-20">
                                <div className="font-medium md:hidden">Share this content:</div>
                                <Share url={`${host}/${slug}`} />
                            </div>
                        </div>
                        <PostBody body={content || ''} />
                        {/* <div className="rich-text">{parse(content || '')}</div> */}
                    </div>

                    {/* <div className="prose prose-lg dark:prose-invert max-w-full mx-auto rich-text">
                        {parse(content || '')}
                    </div> */}

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
                    {/* </div> */}
                </div>
            </PaddingContainer>
        </DefaultLayout>
    );
};

export default PostSlugPage;
