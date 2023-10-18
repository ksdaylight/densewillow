// import { isNil } from 'lodash';
import { DateTime } from 'luxon';
import readingTime from 'reading-time';
import { initQueryClient } from '@ts-rest/react-query';
import axios, { Method, AxiosError, AxiosResponse, isAxiosError } from 'axios';
import { apiBlog, PostWithPartialRelations } from '@api-contracts';
// import { tsRestFetchApi } from '@ts-rest/core';

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
export const baseUrl = `${process.env.SERVER_PUBLIC_URL}`;
export const publicApiUrl = `${process.env.SERVER_PUBLIC_URL}/${process.env.APP_PREFIX}`;
export const privateApiUrl = `http://${process.env.APP_HOST}:${process.env.APP_PORT}`;
export const apiClient = initQueryClient(apiBlog, {
    baseUrl: '',
    baseHeaders: {
        Authorization: 'key',
    },
    credentials: 'include',
    jsonQuery: true,
    api: async ({ path, method, headers, body }) => {
        try {
            const result = await axios.request({
                method: method as Method,
                url: `${baseUrl}${path}`,
                headers,
                data: body,
            });
            const convertedHeaders = new Headers();
            for (const key in result.headers) {
                convertedHeaders.set(key, result.headers[key] as string);
            }
            return { status: result.status, body: result.data, headers: convertedHeaders };
        } catch (e: Error | AxiosError | any) {
            if (isAxiosError(e)) {
                const error = e as AxiosError;
                const response = error.response as AxiosResponse;
                if (response.status === 401 || response.status === 403) {
                    window.location.href = '/auth';
                    // return; // 或者 throw new Error("Unauthorized or Forbidden");
                }
                const convertedHeaders = new Headers();
                for (const key in response.headers) {
                    convertedHeaders.set(key, response.headers[key] as string);
                }
                return { status: response.status, body: response.data, headers: convertedHeaders };
            }
            throw e;
        }
    },
});
