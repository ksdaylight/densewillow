import { Module } from '@nestjs/common';

import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { PrismaService } from './app/prisma.service';
import { PostService } from './app/post.service';
import { AppFilter } from './modules/core/providers/app.filter';

@Module({
    controllers: [AppController],
    providers: [
        AppService,
        PrismaService,
        PostService,
        {
            provide: APP_FILTER,
            useClass: AppFilter,
        },
    ],
})
export class AppModule {}
