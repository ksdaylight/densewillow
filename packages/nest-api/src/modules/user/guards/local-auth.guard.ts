import { BadRequestException, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { CredentialDto } from '../dtos/auth.dto';

/**
 * 用户登录守卫
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        try {
            // console.log(request.headers['user-agent']);
            await validateOrReject(plainToClass(CredentialDto, request.body), {
                validationError: { target: false },
            });
        } catch (errors) {
            const messages = (errors as any[])
                .map((e) => e.constraints ?? {})
                .reduce((o, n) => ({ ...o, ...n }), {});
            throw new BadRequestException(Object.values(messages));
        }
        return super.canActivate(context) as boolean;
    }
}
