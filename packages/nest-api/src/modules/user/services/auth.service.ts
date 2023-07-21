import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FastifyRequest as Request } from 'fastify';
import { ExtractJwt } from 'passport-jwt';

import { getUserConfig } from '../helpers';

import { UserConfig } from '../types';

import { getTime } from '../../core/helpers';

import { PrismaService } from '../../core/providers';

import { App } from '../../core/app';

import { EnvironmentType } from '../../core/constants';

import { TokenService } from './token.service';

/**
 * 账户与认证服务
 */
@Injectable()
export class AuthService {
    constructor(private readonly tokenService: TokenService, protected prisma: PrismaService) {}

    async validateUser(credential: string, password: string) {
        // const user = await this.userService.findOneByCredential(credential, async (query) =>
        //     query.addSelect('user.password'),
        // );
        // if (user && decrypt(password, user.password)) {
        //     return user;
        // }//TODO Remove
        return false;
    }

    // /**
    //  * 登录用户,并生成新的token和refreshToken
    //  * @param user
    //  */
    // async login(user: User) {
    //     const now = await getTime();
    //     const { accessToken } = await this.tokenService.generateAccessToken(user, now);
    //     return accessToken.value;
    // }

    /**
     * 注销登录
     * @param req
     */
    async logout(req: Request) {
        const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req as any);
        if (accessToken) {
            await this.tokenService.removeAccessToken(accessToken);
        }

        return {
            msg: 'logout_success',
        };
    }

    /**
     * 登录用户后生成新的token和refreshToken
     * @param id
     */
    async createToken(id: string) {
        const now = await getTime();
        try {
            const user = await this.prisma.user.findUnique({ where: { id } });
            const { accessToken } = await this.tokenService.generateAccessToken(user, now);
            return accessToken.value;
        } catch (error) {
            throw new ForbiddenException();
        }
    }

    /**
     * 导入Jwt模块
     */
    static jwtModuleFactory() {
        return JwtModule.registerAsync({
            useFactory: async () => {
                const config = await getUserConfig<UserConfig>();
                return {
                    secret: config.jwt.secret,
                    ignoreExpiration: App.configure.getRunEnv() === EnvironmentType.DEVELOPMENT,
                    signOptions: { expiresIn: `${config.jwt.token_expired}s` },
                };
            },
        });
    }
}
