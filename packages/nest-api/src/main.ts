/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';

import { bootApp, createApp, echoApi } from './modules/core/helpers';
import * as configs from './config';
import { MediaModule } from './modules/media/media.modules';

// async function bootstrap() {
//     const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
//         logger: ['error', 'warn'],
//     });
//     const globalPrefix = 'api';
//     app.setGlobalPrefix(globalPrefix);
//     app.enableCors();
//     const port = process.env.PORT || 3000;
//     await app.listen(port);
//     Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
// }

// bootstrap();

const creator = createApp({
    configs,
    configure: { enableDynamicStorage: true },
    modules: [MediaModule],
    builder: async ({ configure, BootModule }) => {
        return NestFactory.create<NestFastifyApplication>(BootModule, new FastifyAdapter(), {
            cors: true,
            logger: ['error', 'warn'],
        });
    },
});
bootApp(creator, ({ configure }) => async () => {
    echoApi(configure);
});
