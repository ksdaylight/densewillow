import Image from 'next/image';

import { PostWithPartialRelations } from '@api-contracts';

import { FC } from 'react';

import { isNil } from 'lodash';

import { baseApiUrl } from '../../app/page';

import PostContent from './PostContent';

interface Props {
    post: PostWithPartialRelations;
}
const PostHero: FC<Props> = ({ post }): JSX.Element => {
    const { thumbnail } = post;
    const thumbnailUrl = !isNil(thumbnail)
        ? `${baseApiUrl}/images/${thumbnail.id}${thumbnail.ext}`
        : null;
    return (
        <div>
            <PostContent isPostPage post={post} />
            {thumbnailUrl ? (
                <Image
                    className="rounded-md object-cover object-center h-[300px] md:h-[500px] mt-6"
                    src={thumbnailUrl}
                    width={1280}
                    height={500}
                    alt={post.title}
                />
            ) : (
                <span>No image</span>
            )}
        </div>
    );
};

export default PostHero;
