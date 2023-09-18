import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FastifyRequest as Request } from 'fastify';
import { ExtractJwt } from 'passport-jwt';

import { Prisma } from '@prisma/client/blog';

import { isNil } from 'lodash';

import { getUserConfig } from '../helpers';

import { UserConfig } from '../types';

import { getTime } from '../../core/helpers';

import { PrismaService } from '../../core/providers';

import { App } from '../../core/app';

import { EnvironmentType } from '../../core/constants';

import { SystemRoles } from '../../rbac/constants';

import { TokenService } from './token.service';

/**
 * 账户与认证服务
 */
@Injectable()
export class AuthService {
    constructor(private readonly tokenService: TokenService, protected prisma: PrismaService) {}

    async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }

    async getMainRole(userUnique: Prisma.UserWhereUniqueInput) {
        const userInfo = await this.prisma.user.findUnique({
            where: userUnique,
            include: {
                roles: {
                    include: {
                        role: true,
                    },
                },
            },
        });
        if (isNil(userInfo)) throw NotFoundException;
        const { roles } = userInfo;

        // 如果用户没有任何角色，返回 null
        if (!roles || roles.length === 0) {
            return null;
        }

        // 如果用户只有一个角色，直接返回该角色
        if (roles.length === 1) {
            return roles[0].role;
        }

        // 如果用户有多个角色，查找是否有 'admin' 角色
        for (const item of roles) {
            if (item.role.name === SystemRoles.ADMIN) {
                return item.role;
            }
        }

        // 如果没有 'admin' 角色，返回第一个角色
        return roles[0].role;
    }

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
            message: 'logout_success',
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
            if (isNil(user)) throw NotFoundException;
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
