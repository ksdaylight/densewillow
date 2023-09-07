// import { isNil } from 'lodash';
import { DateTime } from 'luxon';
import readingTime from 'reading-time';
import { initQueryClient } from '@ts-rest/react-query';

import { apiBlog, PostWithPartialRelations } from '@api-contracts';

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
export const baseApiUrl = `${process.env.SERVER_BASE_URL}/${process.env.APP_PREFIX}`;
export const apiClient = initQueryClient(apiBlog, {
    baseUrl: `${process.env.SERVER_BASE_URL}`,
    baseHeaders: {
        Authorization: 'key',
    }, // 类型需要匹配
    credentials: 'include',
});
