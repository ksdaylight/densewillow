// import { isNil } from 'lodash';
import { DateTime } from 'luxon';
import readingTime from 'reading-time';

import { PostWithPartialRelations } from '@api-contracts';

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
export const getReadingTime = (text: string) => {
    return readingTime(text).text;
};

export const getRelativeDate = (date: string) => {
    return DateTime.fromISO(date).toRelative();
};
