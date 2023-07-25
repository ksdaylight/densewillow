import { NextPage } from 'next';

import AdminLayout from '../../../components/layout/AdminLayout';

import PostAdmin from './post-page';

interface Props {}
// async function getPosts() {
//     const res = await fetch('http://127.0.0.1:3100/api/posts?skip=0&take=9', {
//         headers: {
//             Authorization:
//                 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NGJiOTRhZDA1YTM1ZDliNWZhM2ZiOWUiLCJpYXQiOjE2OTAwMTczNjZ9.cNkj2ctATXNCkbELNXZK-OcrjM_9G66bLmh0pFCM8xo',
//         },
//     }); // TODO BASE URL
//     const data = await res.json();

//     return { body: data };
// }

const Posts: NextPage<Props> = async () => {
    // const queryClient = getQueryClient();

    // await queryClient.prefetchQuery(['getPosts', '1'], getPosts);
    // const dehydratedState = dehydrate(queryClient);

    return (
        <AdminLayout>
            {/* <Hydrate state={dehydratedState}> */}
            <PostAdmin />
            {/* </Hydrate> */}
        </AdminLayout>
    );
};

export default Posts;
