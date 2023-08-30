'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import Image from 'next/legacy/image';
import dateFormat from 'dateformat';
import parse from 'html-react-parser';

import { isNil } from 'lodash';

import Link from 'next/link';

import LikeHeart from '../../components/common/LikeHeart';

import AuthorInfo from '../../components/common/AuthorInfo';
import Comments from '../../components/common/Comments';

import DefaultLayout from '../../components/layout/DefaultLayout';
import { apiClient, baseApiUrl } from '../page';
import Share from '../../components/common/Share'; // 'packages/admin/components/common/Share';

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

    const { id, title, content, tags, meta, author, slug, thumbnail, createdAt, relatedPosts } =
        postData!.body;

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
            <div className="lg:px-0 px-3">
                <div className="relative aspect-video">
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
                </div>

                <div className="py-5 transition dark:bg-primary-dark bg-primary sticky top-0 z-50">
                    <Share url={`${host}/${slug}`} />
                </div>
                <div className="prose prose-lg dark:prose-invert max-w-full mx-auto">
                    {parse(content || '')}
                </div>

                <div className="py-10">
                    <LikeHeart
                        liked={likes.likedByOwner}
                        label={getLikeLabel()}
                        onClick={!liking ? handleOnLikeClick : undefined}
                        busy={liking}
                    />
                </div>

                <div className="pt-10">{author && <AuthorInfo profile={author} />}</div>

                <div className="pt-5">
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
        </DefaultLayout>
    );
};

export default PostSlugPage;
