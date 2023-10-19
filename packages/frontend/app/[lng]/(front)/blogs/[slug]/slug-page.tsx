'use client';

import { FC } from 'react';

import PostBody from '@frontend/components/common/PostBody';

import PostHero from '@frontend/components/common/PostHero';

import PaddingContainer from '@frontend/components/layout/padding-container';

import omit from 'lodash/omit';
import Share from '@frontend/components/common/Share';
import { apiClient } from '@frontend/utils/helps';
import { PortfolioSidebar } from '@frontend/components/common/PortfolioSidebar';

const host = 'https://densewillow.com';

interface Props {
    initialSlug?: string;
    lng?: string;
}
const PostSlugPage: FC<Props> = ({ initialSlug, lng }): JSX.Element => {
    // const { t } = useTranslation(lng, 'client-page');
    const { data: postData } = apiClient.content.getPostUniqueWithRelatedPosts.useQuery(
        ['getPostBySlug', initialSlug || ''],
        {
            query: {
                args: {
                    where: { slug: initialSlug || '' },
                    include: { thumbnail: true, translations: true },
                },
            },
        },
        {
            enabled: false,
            // staleTime: 10000,
        },
    );

    if (!postData) {
        return <>nothing</>;
    }
    return (
        <>
            <PortfolioSidebar activeItem="/blogs" />
            <div className="pl-0 pt-[50px] md:pl-[102px] md:pt-0">
                <PaddingContainer>
                    <div className="space-y-10 pt-0 md:pt-[100px] mb-2 md:mb-[100px]">
                        {postData?.body?.id && (
                            <PostHero post={omit(postData?.body, ['relatedPosts'])} />
                        )}
                        <div className="flex flex-col gap-10 md:flex-row">
                            <div className="relative">
                                <div className="sticky flex items-center gap-5 md:flex-col top-20">
                                    <div className="font-medium md:hidden">Share this content:</div>
                                    <Share url={`${host}/${postData?.body?.slug}`} />
                                </div>
                            </div>
                            <PostBody body={postData?.body?.content || ''} />
                        </div>
                    </div>
                </PaddingContainer>
            </div>
        </>
    );
};

export default PostSlugPage;
