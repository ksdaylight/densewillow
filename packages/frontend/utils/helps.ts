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
export const getReadingTime = (text: string, lng?: string) => {
    const minute = readingTime(text).minutes;
    // Floor to 1 decimal place
    const minutesRounded = Math.floor(minute);
    if (lng === 'cn') {
        return `${minutesRounded} 分`;
    }
    if (minutesRounded === 1) {
        return `${minutesRounded} minute`;
    }
    return `${minutesRounded} minutes`;
};

export const getRelativeDate = (date: string, lng?: string) => {
    return DateTime.fromISO(date)
        .setLocale(lng || 'en')
        .toRelative();
};
export const publicApiUrl = `${process.env.SERVER_PUBLIC_URL}/${process.env.APP_PREFIX}`;
export const privateApiUrl = `http://${process.env.APP_HOST}:${process.env.APP_PORT}`;
export const apiClient = initQueryClient(apiBlog, {
    baseUrl: `${process.env.SERVER_PUBLIC_URL}`,
    baseHeaders: {
        Authorization: 'key',
    },
    credentials: 'include',
});
