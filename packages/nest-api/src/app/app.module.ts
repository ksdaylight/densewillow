import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { PostService } from './post.service';

@Module({
    controllers: [AppController],
    providers: [AppService, PrismaService, PostService],
})
export class AppModule {}
