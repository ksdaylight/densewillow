import { Post, MediaEntity } from '@prisma/client/blog';

import { isNil } from 'lodash';

import { baseApiUrl } from '../app/admin/page';

import { PostDetail } from './types';

type PostWithThumbnail = Post & { thumbnail: MediaEntity | null };
export const formatPosts = (posts: PostWithThumbnail[]): PostDetail[] => {
    return posts.map((post) => ({
        title: post.title,
        slug: post.slug,
        createdAt: post.createdAt.toString(),
        thumbnail: !isNil(post.thumbnail)
            ? `${baseApiUrl}/images/${post.thumbnail.id}${post.thumbnail.ext}`
            : '',
        meta: post.meta,
        tags: post.tags,
    }));
};
