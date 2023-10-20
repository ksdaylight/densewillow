import { NextPage } from 'next';

import PostAdmin from './post-page';

interface Props {}

const Posts: NextPage<Props> = async () => {
    return <PostAdmin />;
};

export default Posts;
