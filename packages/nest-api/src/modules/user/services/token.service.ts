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
import { EnvironmentType } from '../../core/constants';

/**
 * 令牌服务
 */
@Injectable()
export class TokenService {
    constructor(
        protected readonly jwtService: JwtService,

        protected prisma: PrismaService,
    ) {}

    async checkRefreshToken(accessToken: AccessToken) {
        const { userId } = accessToken;
        const refreshToken = await this.prisma.refreshToken.findFirst({
            where: {
                accessTokenId: accessToken.id,
            },
        });

        const now = await getTime();
        this.clearExpiredTokens(userId).catch((error) => console.log(error));
        // 如果此函数被调用不是因为accessToken过期则直接返回false
        if (now.isAfter(accessToken.expired_at) && refreshToken) {
            // 判断refreshToken是否过期
            if (now.isAfter(refreshToken.expired_at)) {
                return false;
            }
            return true;
        }
        return false;
    }

    /**
     * 根据accessToken刷新AccessToken与RefreshToken
     * @param accessToken
     * @param response
     */
    async refreshToken(accessToken: AccessToken, response: Response) {
        const { userId } = accessToken;
        let token = null;

        try {
            const refreshToken = await this.prisma.refreshToken.findFirst({
                where: {
                    accessTokenId: accessToken.id,
                },
            });
            if (refreshToken) {
                const now = await getTime();
                // 判断refreshToken是否过期
                if (now.isAfter(refreshToken.expired_at)) {
                    return null;
                }
                // 如果没过期则生成新的access_token和refresh_token
                const user = await this.prisma.user.findUnique({
                    where: {
                        id: userId,
                    },
                });

                token = await this.generateAccessToken(user, now);

                response.setCookie('auth_token', token.accessToken.value, {
                    path: '/',
                    httpOnly: true,
                    secure: process.env.NODE_ENV === EnvironmentType.PRODUCTION,
                    sameSite: 'strict',
                    domain: '192.168.80.6',
                    maxAge: 3600 * 24 * 7,
                });

                return token;
            }
        } finally {
            this.clearExpiredTokens(userId).catch((error) => console.log(error));
        }

        return token;
    }

    async clearExpiredTokens(userId: string) {
        const oldAccessTokens = await this.prisma.accessToken.findMany({
            where: {
                userId,
            },
        });
        const tasks = [];
        for (const oldAccess of oldAccessTokens) {
            tasks.push(
                this.prisma.refreshToken
                    .findMany({
                        where: {
                            accessTokenId: oldAccess.id,
                        },
                    })
                    .then(async (oldRefreshTokens) => {
                        const deleteTasks = [];
                        for (const oldRefresh of oldRefreshTokens) {
                            const nowTime = await getTime();
                            if (nowTime.isAfter(oldRefresh.expired_at)) {
                                // 创建删除 refreshToken 和 accessToken 的任务
                                const deleteRefreshTokenTask = await this.prisma.refreshToken
                                    .delete({
                                        where: {
                                            id: oldRefresh.id,
                                        },
                                    })
                                    .catch((error) => console.log(error));

                                const deleteAccessTokenTask = await this.prisma.accessToken
                                    .delete({
                                        where: {
                                            id: oldRefresh.accessTokenId,
                                        },
                                    })
                                    .catch((error) => console.log(error));

                                deleteTasks.push(deleteRefreshTokenTask, deleteAccessTokenTask);
                            }
                        }
                        return Promise.all(deleteTasks); // 等待所有的删除任务完成
                    }),
            );
        }

        // 执行所有的任务
        return Promise.all(tasks);
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
