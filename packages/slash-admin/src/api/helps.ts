// import { isNil } from 'lodash';
import { initQueryClient } from '@ts-rest/react-query';
import { appsApi } from '@turnit/api-contracts';
import axios, { Method, AxiosError, AxiosResponse, isAxiosError } from 'axios';
// import { tsRestFetchApi } from '@ts-rest/core';

export const trimText = (text: string, trimBy: number) => {
    if (text.length <= trimBy) return text;
    return `${text.substring(0, trimBy).trim()}...`;
};

export const baseUrl = `http://192.168.31.101`;
export const apiClient = initQueryClient(appsApi, {
    baseUrl: '',
    baseHeaders: {
        Authorization: 'key',
    },
    // credentials: 'include',
    jsonQuery: true,
    api: async ({ path, method, headers, body }) => {
        try {
            const result = await axios.request({
                method: method as Method,
                url: `${baseUrl}${path}`,
                headers,
                data: body,
                // withCredentials: true,
            });
            const convertedHeaders = new Headers();
            for (const key in result.headers) {
                convertedHeaders.set(key, result.headers[key] as string);
            }
            return { status: result.status, body: result.data, headers: convertedHeaders };
            // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
        } catch (e: Error | AxiosError | any) {
            if (isAxiosError(e)) {
                const error = e as AxiosError;
                const response = error?.response as AxiosResponse;
                if (response?.status === 401 || response?.status === 403) {
                    window.location.href = '/auth';
                    // return; // 或者 throw new Error("Unauthorized or Forbidden");
                }
                const convertedHeaders = new Headers();
                for (const key in response?.headers) {
                    convertedHeaders.set(key, response?.headers[key] as string);
                }
                return {
                    status: response?.status,
                    body: response?.data,
                    headers: convertedHeaders,
                };
            }
            throw e;
        }
    },
});
