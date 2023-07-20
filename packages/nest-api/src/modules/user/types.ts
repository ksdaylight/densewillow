/**
 * 用户模块配置
 */
export interface UserConfig {
    hash: number;
    jwt: JwtConfig;
    super: {
        username: string;
        password: string;
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

/**
 * JWT荷载对象类型
 */
export interface JwtPayload {
    sub: string;
    iat: number;
}
