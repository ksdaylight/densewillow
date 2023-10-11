import { NextPage } from 'next';

import MyBlogsClient from './blog-client';

interface Props {}

const MyBlogs: NextPage<Props> = async () => {
    return <MyBlogsClient />;
};
export default MyBlogs;
