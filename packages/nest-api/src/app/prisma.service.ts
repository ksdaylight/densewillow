import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from '@prisma/client/blog';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}
