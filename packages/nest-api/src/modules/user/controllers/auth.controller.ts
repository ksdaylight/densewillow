import util from 'util';

import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';
import { apiBlog } from 'api-contracts';

import { AuthService } from '../services';

/**
 * 账户中心控制器
 */

const c = nestControllerContract(apiBlog.user);
@Controller()
export class AuthController {
    constructor(protected readonly authService: AuthService) {}

    @TsRestHandler(c.githubAuth)
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
    @UseGuards(AuthGuard('github'))
    githubAuthCallback(@Request() req: any) {
        return tsRestHandler(c.githubAuthCallback, async (body) => {
            const message = {
                req: util.inspect(req, { showHidden: false, depth: 3 }),
                body: util.inspect(body, { showHidden: false, depth: 3 }),
            };
            return {
                status: 200 as const,
                body: { message: util.inspect(message, { showHidden: false, depth: 3 }) },
            };
        });

        // 在这里，你可以创建一个 JWT 并将其发送给用户，或者重定向用户到一个包含 JWT 的 URL
    }

    // @Post('login')
    // @Guest()
    // @UseGuards(LocalAuthGuard)
    // async login(@ReqUser() user: ClassToPlain<UserEntity>, @Body() _data: CredentialDto) {
    //     return { token: await this.authService.createToken(user.id) };
    // }

    /**
     * 注销登录
     * @param req
     */
    @Post('logout')
    async logout(@Request() req: any) {
        return this.authService.logout(req);
    }
}
