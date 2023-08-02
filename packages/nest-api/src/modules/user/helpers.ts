import bcrypt from 'bcrypt';
import { isNil, toNumber } from 'lodash';

import { App } from '../core/app';

import { Configure } from '../core/configure';

import { ConfigureFactory, ConfigureRegister } from '../core/types';

import { UserConfig } from './types';
/**
 * 加密明文密码
 * @param password
 */
export const encrypt = async (password: string) => {
    return bcrypt.hashSync(password, (await getUserConfig<number>('hash')) || 10);
};

/**
 * 验证密码
 * @param password
 * @param hashed
 */
export const decrypt = (password: string, hashed: string) => {
    return bcrypt.compareSync(password, hashed);
};

/**
 * 用户配置创建函数
 * @param register
 */
export const createUserConfig: (
    register: ConfigureRegister<RePartial<UserConfig>>,
) => ConfigureFactory<UserConfig> = (register) => ({
    register,
    defaultRegister: defaultUserConfig,
});

/**
 * 默认用户配置
 */
export const defaultUserConfig = (configure: Configure): UserConfig => {
    return {
        hash: 10,
        jwt: {
            secret: configure.env('USER_TOKEN_SECRET', 'my-refresh-secret'),
            token_expired: configure.env('USER_TOKEN_EXPIRED', (v) => toNumber(v), 60),
            refresh_secret: configure.env('USER_REFRESH_TOKEN_SECRET', 'my-refresh-secret'),
            refresh_token_expired: configure.env(
                'USER_REFRESH_TOKEN_EXPIRED',
                (v) => toNumber(v),
                120,
            ),
        },
        github: {
            github_client_id: configure.env('USER_TOKEN_SECRET'),
            github_client_secret: configure.env('GITHUB_CLIENT_SECRET'),
        },
        super: {
            email: configure.env('SUPER_ADMIN_EMAIL', 'admin@admin.com'),
        },
    };
};

/**
 * 获取user模块配置的值
 * @param key
 */
export async function getUserConfig<T>(key?: string): Promise<T> {
    return App.configure.get<T>(isNil(key) ? 'user' : `user.${key}`);
}
