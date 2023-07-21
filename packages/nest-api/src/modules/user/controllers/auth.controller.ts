import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

import { Guest, ReqUser } from '../decorators';

import { AuthService } from '../services';

/**
 * 账户中心控制器
 */

@Controller('auth')
export class AuthController {
    constructor(protected readonly authService: AuthService) {}

    @Get('github')
    @UseGuards(AuthGuard('github'))
    async githubAuth(@Request() req) {}

    @Get('github/callback')
    @UseGuards(AuthGuard('github'))
    githubAuthCallback(@Request() req) {
        // 在这里，你可以创建一个 JWT 并将其发送给用户，或者重定向用户到一个包含 JWT 的 URL
    }

    @Post('login')
    @ApiOperation({ summary: '用户通过凭证(可以是用户名,邮箱,手机号等)+密码登录' })
    @Guest()
    @UseGuards(LocalAuthGuard)
    async login(@ReqUser() user: ClassToPlain<UserEntity>, @Body() _data: CredentialDto) {
        return { token: await this.authService.createToken(user.id) };
    }

    /**
     * 注销登录
     * @param req
     */
    @Post('logout')
    @ApiOperation({ summary: '用户登出账户' })
    @ApiBearerAuth()
    async logout(@Request() req: any) {
        return this.authService.logout(req);
    }
}
