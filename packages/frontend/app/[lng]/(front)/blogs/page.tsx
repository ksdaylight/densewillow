import { NextPage } from 'next';

import MyBlogsClient from './blog-client';

interface Props {
    params: {
        lng: string;
    };
}

const MyBlogs: NextPage<Props> = async ({ params }) => {
    return <MyBlogsClient lng={params.lng} />;
};
export default MyBlogs;
