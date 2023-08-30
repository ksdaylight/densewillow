import Image from 'next/legacy/image';
import { FC } from 'react';

import Link from 'next/link';

import { PostWithPartialRelations } from '@api-contracts';

import { isNil } from 'lodash';

import { baseApiUrl } from '../../app/page';

import PostContent from './post-content';

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
        ? `${baseApiUrl}/images/${thumbnail.id}${thumbnail.ext}`
        : null;
    return (
        <div>
            <Link
                href={`/${slug}`}
                className={`${
                    layout === 'horizontal' ? 'grid items-center grid-cols-2 gap-10' : 'space-y-10'
                }`}
            >
                {/* thumbnail */}
                <div
                    className={`rounded-md w-full object-cover object-center max-h-[300px] flex justify-center items-center ${
                        reverse ? 'order-last' : ''
                    }`}
                    style={{ width: '600px', height: '300px' }} // 设置与 <Image> 组件相同的尺寸
                >
                    {thumbnailUrl ? (
                        <Image
                            className="rounded-md w-full object-cover object-center max-h-[300px]"
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
                {/* <div className="p-2 flex-1 flex flex-col">
                    <Link href={`/${slug}`}>
                        <div className="flex items-center justify-between text-sm text-primary-dark dark:text-primary">
                            <div className="flex items-center space-x-1">
                                {tags.map((t, index) => (
                                    <span key={t + index.toString()}>#{t}</span>
                                ))}
                            </div>
                            <span>{dateformat(createdAt, 'd-mmm-yyyy')}</span>
                        </div>

                        <h1 className="font-semibold text-primary-dark dark:text-primary">
                            {trimText(title, 50)}
                        </h1>
                        <p className="text-secondary-dark">{trimText(meta, 70)}</p>
                    </Link>

                    
                </div> */}
            </Link>
        </div>
    );
};

export default PostCard;
