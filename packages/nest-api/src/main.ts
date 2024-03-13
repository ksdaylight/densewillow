import { exit } from 'process';

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';

import { isNil } from 'lodash';

import { bootApp, createApp, echoApi, getDomain } from './modules/core/helpers';
import * as configs from './config';
import { MediaModule } from './modules/media/media.modules';
import { ContentModule } from './modules/content/content.module';
import { UserModule } from './modules/user/user.module';
import { RbacModule } from './modules/rbac/rbac.module';
import { RbacGuard } from './modules/rbac/guards';
import { Configure } from './modules/core/configure';

const createCorsOptions = (configure: Configure) => {
    const siteUrl = new URL(configure.env('NEXT_PUBLIC_SITE_URL', 'https://densewillow.com'))
        .hostname;

    const parsedDomain = getDomain(siteUrl);

    if (isNil(parsedDomain)) {
        exit(0);
    }

    const originRegExp =
        typeof parsedDomain === 'string'
            ? new RegExp(`${parsedDomain}.*`)
            : new RegExp(`${parsedDomain.sld}.*`); // 取舍的正则写法，可改
    return (origin: string, callback: (err: Error | null, allow?: boolean) => void) => {
        // 添加 localhost 和 127.0.0.1 到允许列表
        const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:[0-9]+)?$/.test(origin);

        const isAllowed = originRegExp.test(origin) || isLocalhost;

        if (isAllowed) {
            callback(null, true);
        } else if (origin) {
            console.log('blocked cors for:', origin);
            callback(new Error(`Not allowed by CORS-> ${origin}`), false);
        } else {
            callback(null, false);
        }
    };
};
const creator = createApp({
    configs,
    configure: { enableDynamicStorage: true },
    modules: [MediaModule, ContentModule, UserModule, RbacModule],
    builder: async ({ configure, BootModule }) => {
        return NestFactory.create<NestFastifyApplication>(
            BootModule,
            new FastifyAdapter({ bodyLimit: 5 * 1024 * 1024 }),
            {
                cors: {
                    origin: createCorsOptions(configure), // 客户端测试地址
                    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
                    credentials: true, // 这个是关键，允许服务器发送 Cookie
                },
                logger: ['error', 'warn'],
            },
        );
    },
    globals: {
        // pipe: null,
        interceptor: null,
        guard: RbacGuard,
    },
});
bootApp(creator, ({ configure }) => async () => {
    echoApi(configure);
});
