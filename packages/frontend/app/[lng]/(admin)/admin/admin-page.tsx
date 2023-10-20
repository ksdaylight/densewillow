'use client';

import { FC, useEffect, useState } from 'react';

import { isNil } from 'lodash';

import { User, PostWithPartialRelations, CommentWithPartialRelations } from '@api-contracts';

import ContentWrapper from '@frontend/components/admin/ContentWrapper';
import LatesUserTable from '@frontend/components/admin/LatesUserTable';
import LatestPostListCard from '@frontend/components/admin/LatestPostListCard';
import LatestCommentListCard from '@frontend/components/admin/LatestCommentListCard';
import { apiClient } from '@frontend/utils/helps';

interface Props {}
const AdminHome: FC<Props> = (): JSX.Element => {
    const [latestPosts, setLatestPosts] = useState<PostWithPartialRelations[]>();
    const [latestComments, setLatestComments] = useState<CommentWithPartialRelations[]>();
    const [latestUsers, setLatestUsers] = useState<User[]>();

    const { data: getPostData } = apiClient.content.getPosts.useQuery(
        ['posts', '3'],
        {
            query: {
                take: 5,
                skip: 0,
            },
        },
        {
            staleTime: Infinity,
        },
    );
    const { data: latestCommentsData } = apiClient.content.getComments.useQuery(
        ['comments', '3'],
        {
            query: {
                take: 5,
                skip: 0,
            },
        },
        {
            staleTime: Infinity,
        },
    );
    const { data: latestUsersData } = apiClient.user.getUsers.useQuery(
        ['users', '3'],
        {
            query: {
                take: 5,
                skip: 0,
            },
        },
        {
            staleTime: Infinity,
        },
    );
    useEffect(() => {
        // fetching latest posts
        const postResult = getPostData?.body.posts;

        if (!isNil(postResult)) {
            setLatestPosts(postResult);
        }
    }, [getPostData]);

    useEffect(() => {
        const commentsResult = latestCommentsData?.body.comments;

        if (!isNil(commentsResult)) {
            const transformResult = commentsResult.filter((item) => item.chiefComment);
            setLatestComments(transformResult);
        }
    }, [latestCommentsData]);

    useEffect(() => {
        const userResult = latestUsersData?.body.users;
        if (!isNil(userResult)) {
            setLatestUsers(userResult);
        }
    }, [latestUsersData]);

    return (
        <>
            <div className="flex space-x-10">
                <ContentWrapper seeAllRoute="/admin/posts" title="Latest Posts">
                    {latestPosts?.map(({ id, title, meta, slug }) => {
                        return (
                            <LatestPostListCard key={id} title={title} meta={meta} slug={slug} />
                        );
                    })}
                </ContentWrapper>

                <ContentWrapper seeAllRoute="/admin/comments" title="Latest Comments">
                    {latestComments?.map((comment) => {
                        return <LatestCommentListCard comment={comment} key={comment.id} />;
                    })}
                </ContentWrapper>
            </div>

            {/* Latest Users */}
            <div className="max-w-[500px]">
                <ContentWrapper title="Latest Users" seeAllRoute="/admin/users">
                    <LatesUserTable users={latestUsers} />
                </ContentWrapper>
            </div>
        </>
    );
};
export default AdminHome;
