import { forwardRef, ModuleMetadata } from '@nestjs/common';

import { ModuleBuilder } from '../core/decorators';
import { UserModule } from '../user/user.module';

import { CoreModule } from '../core/core.module';

import { PrismaService } from '../core/providers';

import { RbacResolver } from './rbac.resolver';
import * as services from './services';

@ModuleBuilder(async (configure) => {
    const providers: ModuleMetadata['providers'] = [
        ...Object.values(services),
        {
            provide: RbacResolver,
            useFactory: async (prismaService: PrismaService) => {
                const resolver = new RbacResolver(prismaService, configure);
                resolver.setOptions({});
                return resolver;
            },
            inject: [PrismaService],
        },
    ];
    return {
        imports: [CoreModule, forwardRef(() => UserModule)],
        providers,
        exports: [RbacResolver, ...Object.values(services)],
    };
})
export class RbacModule {}
