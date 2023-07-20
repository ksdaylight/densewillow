import { forwardRef, ModuleMetadata } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ModuleBuilder } from '../core/decorators';
import { DatabaseModule } from '../database/database.module';
import { addEntities, addSubscribers } from '../database/helpers';
import { UserModule } from '../user/user.module';

import * as entities from './entities';
import { RbacResolver } from './rbac.resolver';
import * as repositories from './repositories';
import * as services from './services';
import * as subscribers from './subscribers';

@ModuleBuilder(async (configure) => {
    const providers: ModuleMetadata['providers'] = [
        ...(await addSubscribers(configure, Object.values(subscribers))),
        ...Object.values(services),
        {
            provide: RbacResolver,
            useFactory: async (dataSource: DataSource) => {
                const resolver = new RbacResolver(dataSource, configure);
                resolver.setOptions({});
                return resolver;
            },
            inject: [getDataSourceToken()],
        },
    ];
    return {
        imports: [
            forwardRef(() => UserModule),
            await addEntities(configure, Object.values(entities)),
            DatabaseModule.forRepository(Object.values(repositories)),
        ],
        providers,
        exports: [
            DatabaseModule.forRepository(Object.values(repositories)),
            RbacResolver,
            ...Object.values(services),
        ],
    };
})
export class RbacModule {}
