'use client';

import { FC } from 'react';

import Image from 'next/image';

import dateFormat from 'dateformat';
import parse from 'html-react-parser';

import { isNil } from 'lodash';

import DefaultLayout from '../../components/layout/DefaultLayout';

import { apiClient, baseApiUrl } from '../admin/page';

interface Props {
    initialSlug?: string;
}
const PostSlugPage: FC<Props> = ({ initialSlug }): JSX.Element => {
    const { data: postData } = apiClient.content.getPostBySlug.useQuery(
        ['getPostBySlug', initialSlug || ''],
        {
            params: { slug: initialSlug || '' },
        },
        {
            enabled: false,
        },
    );
    if (!postData) {
        return <>nothing</>;
    }
    const { title, content, tags, meta, thumbnail, createdAt } = postData.body;
    return (
        <DefaultLayout title={title} desc={meta}>
            <div className="pb-20">
                {thumbnail ? (
                    <div className="relative aspect-video">
                        <Image
                            src={
                                !isNil(thumbnail)
                                    ? `${baseApiUrl}/images/${thumbnail.id}${thumbnail.ext}`
                                    : ''
                            }
                            alt={title}
                            layout="fill"
                        />
                    </div>
                ) : null}

                <h1 className="text-6xl font-semibold text-primary-dark dark:text-primary py-2">
                    {title}
                </h1>

                <div className="flex items-center justify-between py-2 text-secondary-dark dark:text-secondary-light">
                    {tags.map((t, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <span key={t + index.toString()}>#{t}</span>
                    ))}
                    <span>{dateFormat(createdAt, 'd-mmm-yyyy')}</span>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-full mx-auto">
                    {parse(content || '')}
                </div>
            </div>
        </DefaultLayout>
    );
};

export default PostSlugPage;
