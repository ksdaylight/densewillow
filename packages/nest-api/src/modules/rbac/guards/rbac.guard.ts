import { ExecutionContext, Injectable } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { isNil } from 'lodash';

import { ExtractJwt } from 'passport-jwt';

import { RbacResolver } from '../rbac.resolver';

import { PrismaService } from '../../core/providers';

import { JwtAuthGuard } from '../../user/guards';

import { TokenService } from '../../user/services';

import { getCheckers, solveChecker } from './checker';

@Injectable()
export class RbacGuard extends JwtAuthGuard {
    constructor(
        protected reflector: Reflector,
        protected resolver: RbacResolver,
        protected tokenService: TokenService,
        protected prisma: PrismaService,
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

        return solveChecker({
            resolver: this.resolver,
            checkers,
            moduleRef: this.moduleRef,
            userId: request.user.id,
            request,
            prisma: this.prisma,
        });
    }
}
