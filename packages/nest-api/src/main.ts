/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
        logger: ['error', 'warn'],
    });
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    app.enableCors();
    const port = process.env.PORT || 3000;
    await app.listen(port);
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
