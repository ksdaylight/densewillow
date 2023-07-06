import { toNumber } from 'lodash';

import { AppConfig, ConfigureFactory, ConfigureRegister } from '../types';

import { toBoolean } from './utils';

/**
 * 应用配置工厂
 */
export const createAppConfig: (
    register: ConfigureRegister<RePartial<AppConfig>>,
) => ConfigureFactory<AppConfig> = (register) => ({
    register,
    defaultRegister: (configure) => ({
        host: configure.env('APP_HOST', '127.0.0.1'),
        globalPrefix: configure.env('APP_PREFIX', 'api'),
        port: configure.env('APP_PORT', (v) => toNumber(v), 3000),
        https: configure.env('APP_SSL', (v) => toBoolean(v), false),
        timezone: configure.env('APP_TIMEZONE', 'Asia/Shanghai'),
        locale: configure.env('APP_LOCALE', 'zh-cn'),
    }),
});
