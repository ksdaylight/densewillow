import util from 'util';

import { Controller, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';
import { apiBlog } from '@api-contracts';

import { User } from '@prisma/client/blog';

import { FastifyReply } from 'fastify';

import { AuthService } from '../services';
import { Guest, ReqUser } from '../decorators';
import { EnvironmentType } from '../../core/constants';

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
    async githubAuthCallback(@ReqUser() user: ClassToPlain<User>, @Res() reply: FastifyReply) {
        return tsRestHandler(c.githubAuthCallback, async () => {
            const token = await this.authService.createToken(user.id);
            const role = await this.authService.getMainRole({
                id: user.id,
            });

            reply.setCookie('auth_token', token, {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === EnvironmentType.PRODUCTION,
                sameSite: 'strict',
                domain: '192.168.80.6',
                maxAge: 3600 * 24 * 7,
            });
            reply.setCookie('user_role', role.name, {
                path: '/',
                httpOnly: false,
                secure: false,
                sameSite: 'strict',
                domain: '192.168.80.6',
                maxAge: 3600 * 24 * 7,
            });
            // 重定向
            const redirectUrl = `http://192.168.80.6:4200`;
            reply.status(302).redirect(redirectUrl);

            return { status: 200 as const, body: reply }; // 怎么都可以，写这个是为了过类型检测
        });
    }

    /**
     * 注销登录
     * @param req
     */
    @TsRestHandler(c.logout)
    async logout(@Request() req: any, @Res() reply: FastifyReply) {
        // TODO logout + login 页面跳转
        return tsRestHandler(c.logout, async () => {
            try {
                await this.authService.logout(req);
            } catch (error) {
                return { status: 404, body: { message: 'error' } };
            }
            reply.setCookie('auth_token', 'deleted', {
                path: '/',
                expires: new Date(0),
                httpOnly: true,
                secure: process.env.NODE_ENV === EnvironmentType.PRODUCTION,
                sameSite: 'strict',
                domain: '192.168.80.6',
                maxAge: 3600 * 24 * 7,
            });
            const redirectUrl = `http://192.168.80.6:4200`;
            reply.status(302).redirect(redirectUrl); // teRest 有问题， @Res() 后不能正常获取返回
            return { status: 200 as const, body: { message: 'success' } }; // 怎么都可以
        });
    }
}
