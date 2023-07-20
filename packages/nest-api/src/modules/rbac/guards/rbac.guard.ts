import { ExecutionContext, Injectable } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { isNil } from 'lodash';

import { ExtractJwt } from 'passport-jwt';

import { JwtAuthGuard } from '@/modules/user/guards';

import { UserRepository } from '@/modules/user/repositories';
import { TokenService } from '@/modules/user/services';

import { RbacResolver } from '../rbac.resolver';

import { getCheckers, solveChecker } from './checker';

@Injectable()
export class RbacGuard extends JwtAuthGuard {
    constructor(
        protected reflector: Reflector,
        protected resolver: RbacResolver,
        protected tokenService: TokenService,
        protected userRepository: UserRepository,
        protected moduleRef: ModuleRef,
    ) {
        super(reflector, tokenService);
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const authCheck = await super.canActivate(context);
        let request = context.switchToHttp().getRequest();
        const requestToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
        if (!authCheck) return false;
        if (authCheck && isNil(requestToken)) return true;
        const checkers = getCheckers(context, this.reflector);
        if (isNil(checkers) || checkers.length <= 0) return true;

        request = context.switchToHttp().getRequest();
        if (isNil(request.user)) return false;
        const user = await this.userRepository.findOneOrFail({
            relations: ['roles.permissions', 'permissions'],
            where: {
                id: request.user.id,
            },
        });
        return solveChecker({
            resolver: this.resolver,
            checkers,
            moduleRef: this.moduleRef,
            user,
            request,
        });
    }
}
