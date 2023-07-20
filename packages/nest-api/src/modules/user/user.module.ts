import { forwardRef } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { Configure } from '../core/configure';

import { EnvironmentType } from '../core/constants';

import { ModuleBuilder } from '../core/decorators';
import { DatabaseModule } from '../database/database.module';
import { addEntities, addSubscribers } from '../database/helpers';

import { RbacModule } from '../rbac/rbac.module';

import * as entities from './entities';
import * as guards from './guards';
import * as repositories from './repositories';
import * as services from './services';
import * as strategies from './strategies';
import * as subscribers from './subscribers';
import { UserConfig } from './types';

const jwtModuleRegister = (configure: Configure) => async (): Promise<JwtModuleOptions> => {
    const config = await configure.get<UserConfig>('user');
    const isProd = configure.getRunEnv() === EnvironmentType.PRODUCTION;
    const option: JwtModuleOptions = {
        secret: config.jwt.secret,
        verifyOptions: {
            ignoreExpiration: !isProd,
        },
        ...(isProd === true ? { signOptions: { expiresIn: `${config.jwt.token_expired}s` } } : {}),
    };
    // if (isProd) option.signOptions.expiresIn = `${config.jwt.token_expired}s`;
    return option;
};

@ModuleBuilder(async (configure) => ({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            useFactory: jwtModuleRegister(configure),
        }),
        await addEntities(configure, Object.values(entities)),
        forwardRef(() => RbacModule),
        DatabaseModule.forRepository(Object.values(repositories)),
    ],
    providers: [
        ...Object.values(services),
        ...(await addSubscribers(configure, Object.values(subscribers))),
        ...Object.values(strategies),
        ...Object.values(guards),
    ],
    exports: [
        ...Object.values(services),
        DatabaseModule.forRepository(Object.values(repositories)),
    ],
}))
export class UserModule {}
