import { NextPage } from 'next';

import { dehydrate } from '@tanstack/query-core';
import { Hydrate } from '@tanstack/react-query';

import getQueryClient from '../../../utils/getQueryClient';

import AdminLayout from '../../../components/layout/AdminLayout';

import PostAdmin from './post-page';

interface Props {}
async function getPosts() {
    const res = await fetch('http://127.0.0.1:3100/api/posts?skip=0&take=9'); // TODO BASE URL
    const data = await res.json();

    return { body: data };
}

const Posts: NextPage<Props> = async () => {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery(['getPosts', '1'], getPosts);
    const dehydratedState = dehydrate(queryClient);

    return (
        <AdminLayout>
            <Hydrate state={dehydratedState}>
                <PostAdmin />
            </Hydrate>
        </AdminLayout>
    );
};

export default Posts;
