import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';

import { bootApp, createApp, echoApi } from './modules/core/helpers';
import * as configs from './config';
import { MediaModule } from './modules/media/media.modules';
import { ContentModule } from './modules/content/content.module';
import { UserModule } from './modules/user/user.module';
import { RbacModule } from './modules/rbac/rbac.module';
import { RbacGuard } from './modules/rbac/guards';

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
                    origin: `${configure.env('NEXT_PUBLIC_SITE_URL', 'http://192.168.80.6:4200')}`, // 客户端测试地址
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
