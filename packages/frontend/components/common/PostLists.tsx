import { PostWithPartialRelations } from '@api-contracts';

import { FC } from 'react';

import PostCard from './PostCard';

interface Props {
    posts: PostWithPartialRelations[];
    busy?: boolean;
    busyId?: string;
    controls?: boolean;
    onDeleteClick(post: PostWithPartialRelations): void;
    layout?: 'vertical' | 'horizontal';
}
const PostList: FC<Props> = ({
    posts,
    layout = 'vertical',
    controls = false,
    busy,
    busyId,
    onDeleteClick,
}): JSX.Element => {
    return (
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-flow-col lg:auto-cols-fr">
            {posts.map((post) => (
                <PostCard
                    layout={layout}
                    post={post}
                    key={post.slug}
                    controls={controls}
                    onDeleteClick={() => onDeleteClick(post)}
                    busy={post.id === busyId && busy}
                />
            ))}
        </div>
    );
};

export default PostList;
