import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
import { FastifyReply as Response } from 'fastify';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { AccessToken, RefreshToken, User } from '@prisma/client/blog';

import { getUserConfig } from '../helpers';
import { JwtConfig, JwtPayload } from '../types';
import { PrismaService } from '../../core/providers';
import { getTime } from '../../core/helpers';

/**
 * 令牌服务
 */
@Injectable()
export class TokenService {
    constructor(
        protected readonly jwtService: JwtService,

        protected prisma: PrismaService,
    ) {}

    /**
     * 根据accessToken刷新AccessToken与RefreshToken
     * @param accessToken
     * @param response
     */
    async refreshToken(accessToken: AccessToken, response: Response) {
        const { userId } = accessToken;
        const refreshToken = await this.prisma.refreshToken.findFirst({
            where: {
                accessTokenId: accessToken.id,
            },
        });
        console.log('------------------- 0');
        if (refreshToken) {
            console.log('------------------- 1');
            const now = await getTime();
            // 判断refreshToken是否过期
            if (now.isAfter(refreshToken.expired_at)) return null;
            // 如果没过期则生成新的access_token和refresh_token
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            const token = await this.generateAccessToken(user, now);
            console.log('------------------- 2');
            try {
                await this.prisma.refreshToken.delete({
                    where: {
                        id: refreshToken.id,
                    },
                });
                console.log(`------------------- 3 ${refreshToken.id}`);
            } catch (error) {
                console.log(error);
            }
            try {
                await this.prisma.accessToken.delete({
                    where: {
                        id: accessToken.id,
                    },
                });

                console.log(`------------------- 4 ${accessToken.id}`);
            } catch (error) {
                console.log(error);
            }
            // response.header('token', token.accessToken.value);

            response.setCookie('auth_token', token.accessToken.value, {
                path: '/',
                httpOnly: true,
                secure: false, // process.env.NODE_ENV === EnvironmentType.PRODUCTION,
                sameSite: 'strict',
                domain: '192.168.80.6',
                maxAge: 3600 * 24 * 7,
            }); // TODO 需要测试是否成功刷给用户了
            return token;
        }
        console.log('------------------- 6');
        return null;
    }

    /**
     * 根据荷载签出新的AccessToken并存入数据库
     * 且自动生成新的Refresh也存入数据库
     * @param user
     * @param now
     */
    async generateAccessToken(user: User, now: dayjs.Dayjs) {
        const config = await getUserConfig<JwtConfig>('jwt');
        const accessTokenPayload: JwtPayload = {
            sub: user.id,
            iat: now.unix(),
        };

        const signed = this.jwtService.sign(accessTokenPayload);

        const accessToken = await this.prisma.accessToken.create({
            data: {
                value: signed,
                expired_at: now.add(config.token_expired, 'second').toDate(),
                user: {
                    connect: {
                        id: user.id,
                    },
                },
            },
        });

        const refreshToken = await this.generateRefreshToken(accessToken, await getTime());
        return { accessToken, refreshToken };
    }

    /**
     * 生成新的RefreshToken并存入数据库
     * @param accessToken
     * @param now
     */
    async generateRefreshToken(accessToken: AccessToken, now: dayjs.Dayjs): Promise<RefreshToken> {
        const config = await getUserConfig<JwtConfig>('jwt');
        const refreshTokenPayload = {
            uuid: uuid(),
        };
        const refreshTokenValue = jwt.sign(refreshTokenPayload, config.refresh_secret);
        const expiredAt = now.add(config.refresh_token_expired, 'second').toDate();

        const refreshToken = await this.prisma.refreshToken.create({
            data: {
                value: refreshTokenValue,
                expired_at: expiredAt,
                accessToken: {
                    connect: {
                        id: accessToken.id,
                    },
                },
            },
        });
        return refreshToken;
    }

    /**
     * 检查accessToken是否存在
     * @param value
     */
    async checkAccessToken(value: string) {
        return this.prisma.accessToken.findFirst({
            where: { value },
            include: { refreshToken: true, user: true },
        });
    }

    /**
     * 移除AccessToken且自动移除关联的RefreshToken
     * @param value
     */
    async removeAccessToken(value: string) {
        const accessToken = await this.prisma.accessToken.findFirst({
            where: { value },
        });
        if (accessToken)
            await this.prisma.accessToken.delete({
                where: { id: accessToken.id },
            });
    }

    /**
     * 移除RefreshToken
     * @param value
     */
    async removeRefreshToken(value: string) {
        const refreshToken = await this.prisma.refreshToken.findFirst({
            where: { value },
            include: { accessToken: true },
        });
        if (refreshToken) {
            if (refreshToken.accessToken) {
                await this.prisma.accessToken.delete({
                    where: { id: refreshToken.accessToken.id },
                });
            }

            await this.prisma.refreshToken.delete({
                where: { id: refreshToken.id },
            });
        }
    }

    /**
     * 验证Token是否正确,如果正确则返回所属用户对象
     * @param token
     */
    async verifyAccessToken(token: AccessToken) {
        const config = await getUserConfig<JwtConfig>('jwt');
        const result = jwt.verify(token.value, config.secret);
        if (!result) return false;

        return this.prisma.user.findUnique({
            where: {
                id: token.userId,
            },
        });
    }
}
