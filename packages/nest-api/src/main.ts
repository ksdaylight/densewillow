import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';

import { bootApp, createApp, echoApi } from './modules/core/helpers';
import * as configs from './config';
import { MediaModule } from './modules/media/media.modules';
import { ContentModule } from './modules/content/content.module';

const creator = createApp({
    configs,
    configure: { enableDynamicStorage: true },
    modules: [MediaModule, ContentModule],
    builder: async ({ configure, BootModule }) => {
        return NestFactory.create<NestFastifyApplication>(
            BootModule,
            new FastifyAdapter({ bodyLimit: 5 * 1024 * 1024 }),
            {
                cors: true,
                logger: ['error', 'warn'],
            },
        );
    },
    globals: {
        pipe: null,
        interceptor: null,
    },
});
bootApp(creator, ({ configure }) => async () => {
    echoApi(configure);
});
