import Image from 'next/legacy/image';
import { FC } from 'react';

import Link from 'next/link';

import { PostWithPartialRelations } from '@api-contracts';

import { isNil } from 'lodash';

import { publicApiUrl } from '@frontend/utils/helps';

import PostContent from './PostContent';

interface Props {
    post: PostWithPartialRelations;
    busy?: boolean;
    controls?: boolean;
    onDeleteClick?(): void;
    layout?: 'vertical' | 'horizontal';
    reverse?: boolean;
}

const PostCard: FC<Props> = ({
    controls = false,
    post,
    busy,
    onDeleteClick,
    layout = 'horizontal',
    reverse = false,
}): JSX.Element => {
    const { slug, thumbnail } = post;
    const thumbnailUrl = !isNil(thumbnail)
        ? `${publicApiUrl}/images/${thumbnail.id}${thumbnail.ext}`
        : null;
    return (
        <div className="p-2 flex-1 flex flex-col">
            <Link
                href={`/${slug}`}
                className={`@container ${
                    layout === 'horizontal'
                        ? 'grid items-center  grid-cols-1 md:grid-cols-2  gap-10'
                        : 'space-y-10'
                }`}
            >
                {/* thumbnail */}
                <div
                    className={`rounded-md w-full object-cover object-center max-h-[300px] max-w-[600px] flex justify-center items-center ${
                        reverse ? 'md:order-last' : ''
                    }`}
                >
                    {thumbnailUrl ? (
                        <Image
                            className="rounded-md w-full object-cover object-center h-full max-h-[300px]"
                            alt={post.title}
                            src={thumbnailUrl}
                            width={600}
                            height={300}
                        />
                    ) : (
                        // <Image src={thumbnailUrl} layout="fill" alt="Thumbnail" />
                        <span>No image</span>
                    )}
                </div>

                {/* Post Info */}
                <PostContent post={post} />
            </Link>
            {controls && (
                <div className="flex justify-end items-center h-8 mt-auto space-x-4 text-primary-dark dark:text-white">
                    {busy ? (
                        <span className="animate-pulse">Removing</span>
                    ) : (
                        <>
                            <Link href={`/admin/posts/update/${slug}`} className="hover:underline">
                                Edit
                            </Link>
                            <button onClick={onDeleteClick} className="hover:underline">
                                Delete
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default PostCard;
