'use client';

import { FC, useEffect, useState } from 'react';

import { isNil } from 'lodash';

import { formatPosts } from '../../utils/helps';
import { LatestComment, LatestUserProfile, PostDetail } from '../../utils/types';
import ContentWrapper from '../../components/admin/ContentWrapper';
import LatesUserTable from '../../components/admin/LatesUserTable';
import LatestPostListCard from '../../components/admin/LatestPostListCard';
import LatestCommentListCard from '../../components/admin/LatestCommentListCard';
import { apiClient } from '../page';

interface Props {}
const AdminHome: FC<Props> = (): JSX.Element => {
    const [latestPosts, setLatestPosts] = useState<PostDetail[]>();
    const [latestComments, setLatestComments] = useState<LatestComment[]>();
    const [latestUsers, setLatestUsers] = useState<LatestUserProfile[]>();

    const { data: getPostData } = apiClient.content.getPosts.useQuery(
        ['posts', '3'],
        {
            query: {
                take: String(5),
                skip: String(0),
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
                take: String(5),
                skip: String(0),
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
                take: String(5),
                skip: String(0),
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
            setLatestPosts(formatPosts(postResult));
        }
    }, [getPostData]);

    useEffect(() => {
        const commentsResult = latestCommentsData?.body.comments;

        if (!isNil(commentsResult)) {
            const transformResult = commentsResult.map(
                (item): LatestComment => ({
                    id: item.id,
                    owner: {
                        id: item.owner.id,
                        name: item.owner.name,
                        avatar: item.owner.avatar,
                    },
                    content: item.content || '',
                    belongsTo: {
                        id: item.belongsTo.id,
                        title: item.belongsTo.title,
                        slug: item.belongsTo.slug,
                    },
                }),
            );
            setLatestComments(transformResult);
        }
    }, [latestCommentsData]);

    useEffect(() => {
        const userResult = latestUsersData?.body.users;
        if (!isNil(userResult)) {
            const transformUser = userResult.map(
                (item: any): LatestUserProfile => ({
                    id: item.i,
                    name: item.name,
                    avatar: item.avatar,
                    provider: item.provider,
                    email: item.email,
                }),
            );
            setLatestUsers(transformUser);
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
