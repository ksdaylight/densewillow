import { Configure } from './configure';

import { ModuleBuilder } from './decorators';
import { PrismaService } from './providers';

/**
 * 全局核心模块
 */
@ModuleBuilder(async (configure) => ({
    global: true,
    providers: [
        {
            provide: Configure,
            useValue: configure,
        },
        PrismaService,
    ],
    exports: [Configure, PrismaService],
}))
export class CoreModule {}
