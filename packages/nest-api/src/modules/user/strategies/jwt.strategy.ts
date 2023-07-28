import { Injectable, OnModuleInit } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { instanceToPlain } from 'class-transformer';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { FastifyRequest } from 'fastify';

import { getUserConfig } from '../helpers';
import { JwtPayload } from '../types';
import { PrismaService } from '../../core/providers';

/**
 * 用户认证JWT策略
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) implements OnModuleInit {
    private secretOrKey: string | Buffer;

    constructor(private readonly prisma: PrismaService) {
        super({
            jwtFromRequest: (req: FastifyRequest) => {
                let token = ExtractJwt.fromAuthHeaderAsBearerToken()(req as any); // 请求头的优先
                if (!token && req && req.cookies) {
                    token = req.cookies.yourCookieName;
                }
                return token;
            },
            ignoreExpiration: false,
            secretOrKeyProvider: (
                _req: Request,
                _rawJwtToken: string,
                done: (err: Error | null, secretOrKey: string | Buffer) => void,
            ) => {
                done(null, this.secretOrKey);
            },
        });
    }

    async onModuleInit() {
        this.secretOrKey = await getUserConfig('jwt.secret');
    }

    /**
     * 通过荷载解析出用户ID
     * @param payload
     */
    async validate(payload: JwtPayload) {
        const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
        return instanceToPlain(user);
    }
}
