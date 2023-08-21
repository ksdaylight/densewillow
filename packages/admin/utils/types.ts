export interface PostDetail {
    id: string;
    title: string;
    slug: string;
    meta: string;
    tags: string[];
    thumbnail?: string;
    createdAt: string;
}

export interface IncomingPost {
    title: string;
    content: string;
    slug: string;
    meta: string;
    tags: string;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    avatar: string | undefined;
    role: 'user' | 'admin';
}
export type ReplyComments = CommentResponse[];
export interface CommentResponse {
    id: string;
    content: string;
    createdAt: string;
    likes: number;
    likedByOwner?: boolean;
    replies?: ReplyComments;
    repliedTo?: string;
    chiefComment: boolean;
    owner: { name: string; id: string; avatar?: string };
}

export interface LatestComment {
    id: string;
    owner: {
        id: string;
        name: string;
        avatar: string | null;
    };
    content: string;
    belongsTo: {
        id: string;
        title: string;
        slug: string;
    };
}

export interface LatestUserProfile {
    id: string;
    name: string;
    avatar?: string;
    provider: string;
    email: string;
}
// TODO need all
