import { Post, MediaEntity } from '@prisma/client/blog';

import { isNil } from 'lodash';

import { PostWithPartialRelations } from '@api-contracts';

import { baseApiUrl } from '../app/page';

import { PostDetail } from './types';

type PostWithThumbnail = Post & { thumbnail: MediaEntity | null };
export const formatPosts = (posts: PostWithThumbnail[]): PostDetail[] => {
    return posts.map((post) => ({
        id: post.id.toString(),
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
export const filterPosts = (
    posts: PostWithPartialRelations[],
    postToFilter: PostWithPartialRelations,
) => {
    return posts.filter((post) => {
        return post.id !== postToFilter.id;
    });
};
export const trimText = (text: string, trimBy: number) => {
    if (text.length <= trimBy) return text;
    return `${text.substring(0, trimBy).trim()}...`;
};
