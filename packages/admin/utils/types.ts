export interface PostDetail {
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
