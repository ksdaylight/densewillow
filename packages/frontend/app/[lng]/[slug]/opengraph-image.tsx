/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unknown-property */

import { ImageResponse } from 'next/server';

import { isNil } from 'lodash';
import {
    publicApiUrl,
    getReadingTime,
    getRelativeDate,
    privateApiUrl,
} from '@frontend/utils/helps';
import { cache } from 'react';

export const size = {
    width: 1200,
    height: 630,
};
export const alt = 'DenseWillow | Blog';
export const contentType = 'image/png';
const getPostData = cache(async (slug: string) => {
    try {
        const res = await fetch(`${privateApiUrl}/api/post/slug/${slug}`, {
            credentials: 'include',
            // cache: 'no-store',
        });
        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching post');
    }
}); // copy form page.tsx 2 times
export default async function og({
    params: { slug, lng },
}: {
    params: { slug: string; lng: string };
}) {
    const post = await getPostData(slug);
    const { thumbnail } = post;
    const thumbnailUrl = !isNil(thumbnail)
        ? `${publicApiUrl}/images/${thumbnail.id}${thumbnail.ext}`
        : null;
    return new ImageResponse(
        (
            <div tw="relative flex w-full h-full flex items-center justify-center">
                {/* Background */}
                <div tw="absolute flex inset-0">
                    <img
                        tw="flex flex-1 object-cover w-full h-full object-center"
                        src={thumbnailUrl || ''}
                        alt={post?.title}
                    />
                    {/* Overlay */}
                    <div tw="absolute flex inset-0 bg-black bg-opacity-50" />
                </div>
                <div tw="flex flex-col text-neutral-50 ">
                    {/* Title */}
                    <div tw="text-[60px]">{post?.title}</div>
                    {/* Description */}
                    <div tw="text-2xl max-w-4xl">{post?.meta}</div>
                    {/* Tags */}
                    <div tw="flex mt-6 flex-wrap items-center text-3xl text-neutral-200">
                        <div
                            tw={`flex font-medium ${
                                post?.tags.includes('TS') === 'Cities'
                                    ? 'text-emerald-600'
                                    : 'text-indigo-600'
                            }`}
                        >
                            {post.tags.map((t: any) => (
                                <span>#{t}</span>
                            ))}
                        </div>
                        <div tw="w-4 h-4 mx-6 rounded-full bg-neutral-300 " />
                        <div>{`${post?.author.name}`}</div>
                        <div tw="w-4 h-4 mx-6 rounded-full bg-neutral-300" />
                        <div>{getReadingTime(post?.content, lng)}</div>
                        <div tw="w-4 h-4 mx-6 rounded-full bg-neutral-300" />
                        <div>{getRelativeDate(post?.createAt, lng)}</div>
                    </div>
                </div>
            </div>
        ),
        size,
    );
}
