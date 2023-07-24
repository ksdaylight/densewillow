import { dehydrate } from '@tanstack/query-core';
import { NextPage } from 'next';

import getQueryClient from '../utils/getQueryClient';
import DefaultLayout from '../components/layout/DefaultLayout';
import Hydrate from '../utils/hydrate.client';

import Home from './home-page';

interface Props {}
async function getPosts() {
    const res = await fetch('http://127.0.0.1:3100/api/posts?skip=0&take=9'); // TODO BASE URL
    const data = await res.json();

    return { body: data };
}

const Index: NextPage<Props> = async () => {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery(['getPosts', '1'], getPosts);
    const dehydratedState = dehydrate(queryClient);

    return (
        <DefaultLayout>
            <div className="pb-20">
                <Hydrate state={dehydratedState}>
                    <Home />
                </Hydrate>
            </div>
        </DefaultLayout>
    );
};

export default Index;
