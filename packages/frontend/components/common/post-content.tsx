import { ArrowRight } from 'lucide-react';

import { PostWithPartialRelations } from '@api-contracts';

import { getReadingTime, getRelativeDate, trimText } from '../../utils/helps';

interface PostContentProps {
    post: PostWithPartialRelations;
}
const PostContent = ({ post }: PostContentProps) => {
    return (
        <div className="space-y-2">
            {/* Tags */}
            <div className="flex items-center gap-2  text-xs @md:text-sm text-neutral-400">
                <div
                    className={`font-medium ${
                        post.tags.includes('TS') ? 'text-emerald-600' : 'text-indigo-600'
                    }`}
                >
                    {post.tags.map((t, index) => (
                        <span key={t + index.toString()}>#{t}</span>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-2  text-xs @md:text-sm text-neutral-400">
                <div className="w-2 h-2 rounded-full bg-neutral-200" />
                <div>{`${post.author?.name}`}</div>
                <div className="w-2 h-2 rounded-full bg-neutral-200" />
                <div>{getReadingTime(post.content || '')}</div>
                <div className="w-2 h-2 rounded-full bg-neutral-200" />
                <div>{getRelativeDate(post.createdAt as any as string)}</div>
            </div>
            {/* Title */}
            <h2 className="@lg:text-3xl text-xl @md:text-2xl  font-medium">{post.title}</h2>
            {/* Description */}
            <p className="text-base @lg:text-lg leading-snug text-neutral-600">
                {trimText(post.meta, 70)}
            </p>
            {/* Read More */}
            <div className="flex items-center gap-2 pt-3">
                Read More <ArrowRight size="14" />
            </div>
        </div>
    );
};

export default PostContent;
