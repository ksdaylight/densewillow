import util from 'util';

import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';
import { apiBlog } from 'api-contracts';

import { User } from '@prisma/client/blog';

import { AuthService } from '../services';
import { Guest, ReqUser } from '../decorators';

/**
 * 账户中心控制器
 */

const c = nestControllerContract(apiBlog.user);
@Controller()
export class AuthController {
    constructor(protected readonly authService: AuthService) {}

    @TsRestHandler(c.githubAuth)
    @Guest()
    @UseGuards(AuthGuard('github'))
    async githubAuth(@Request() req: any) {
        return tsRestHandler(c.githubAuth, async (body) => {
            const message = {
                req: util.inspect(req, { showHidden: false, depth: 3 }),
                body: util.inspect(body, { showHidden: false, depth: 3 }),
            };
            return {
                status: 200 as const,
                body: { message: util.inspect(message, { showHidden: false, depth: 3 }) },
            };
        });
    }

    @TsRestHandler(c.githubAuthCallback)
    @Guest()
    @UseGuards(AuthGuard('github'))
    githubAuthCallback(@Request() req: any, @ReqUser() user: ClassToPlain<User>) {
        return tsRestHandler(c.githubAuthCallback, async () => {
            return {
                status: 200 as const,
                body: { token: await this.authService.createToken(user.id) },
            };
        });
    }

    /**
     * 注销登录
     * @param req
     */
    @Post('logout')
    async logout(@Request() req: any) {
        return this.authService.logout(req);
    }
}
