import { forwardRef } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { Configure } from '../core/configure';

import { EnvironmentType } from '../core/constants';

import { ModuleBuilder } from '../core/decorators';

import { RbacModule } from '../rbac/rbac.module';

import { CoreModule } from '../core/core.module';

import * as guards from './guards';
import * as services from './services';
import * as strategies from './strategies';
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
        CoreModule,
        forwardRef(() => RbacModule),
    ],
    providers: [...Object.values(services), ...Object.values(strategies), ...Object.values(guards)],
    exports: [...Object.values(services)],
}))
export class UserModule {}
