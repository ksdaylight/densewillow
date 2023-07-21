/**
 * 用户模块配置
 */
export interface UserConfig {
    hash: number;
    jwt: JwtConfig;
    github: GithubConfig;
    super: {
        email: string;
    };
}

/**
 * JWT配置
 */
export interface JwtConfig {
    secret: string;
    token_expired: number;
    refresh_secret: string;
    refresh_token_expired: number;
}
export interface GithubConfig {
    github_client_id: string;
    github_client_secret: string;
}

/**
 * JWT荷载对象类型
 */
export interface JwtPayload {
    sub: string;
    iat: number;
}

export interface GitHubProfile {
    id: string;
    displayName: string;
    username: string;
    profileUrl: string;
    emails: { value: string }[];
    photos: { value: string }[];
    provider: string;
    _raw: string;
    _json: {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
        name: string;
        company: null;
        blog: string;
        location: null;
        email: string;
        hireable: null;
        bio: null;
        public_repos: number;
        public_gists: number;
        followers: number;
        following: number;
        created_at: string;
        updated_at: string;
    };
    accessToken: string;
}
