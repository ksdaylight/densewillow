import Image from 'next/image';

import { FC } from 'react';

import { isNil } from 'lodash';

import { publicApiUrl } from '@frontend/utils/helps';

import { PostPartialWithRelations } from 'packages/api-contracts/src/zod';

import PostContent from './PostContent';

interface Props {
    post: PostPartialWithRelations;
}
const PostHero: FC<Props> = ({ post }): JSX.Element => {
    const { thumbnail } = post;
    const thumbnailUrl = !isNil(thumbnail)
        ? `${publicApiUrl}/images/${thumbnail.id}${thumbnail.ext}`
        : null;
    return (
        <div>
            <PostContent isPostPage post={post} />
            {thumbnailUrl ? (
                <Image
                    priority
                    className="rounded-md object-cover object-center h-[300px] md:h-[500px] mt-6"
                    src={thumbnailUrl}
                    width={1280}
                    height={500}
                    alt={post?.title || ''}
                />
            ) : (
                <span>No image</span>
            )}
        </div>
    );
};

export default PostHero;
