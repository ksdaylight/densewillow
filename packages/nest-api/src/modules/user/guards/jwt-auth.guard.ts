import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { isNil } from 'lodash';
import { ExtractJwt } from 'passport-jwt';

import { FastifyRequest } from 'fastify';

import { TokenService } from '../services/token.service';
import { ALLOW_GUEST } from '../constants';
/**
 * 用户JWT认证守卫
 * 检测用户是否已登录
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(protected reflector: Reflector, protected tokenService: TokenService) {
        super();
    }

    IPprefixes = ['127.0.0.1']; // if need, can rm it to config

    /**
     * 守卫方法
     * @param context
     */
    async canActivate(context: ExecutionContext) {
        const methodGuest = Reflect.getMetadata(
            ALLOW_GUEST,
            context.getClass().prototype,
            context.getHandler().name,
        );
        const defaultGuest = this.reflector.getAllAndOverride<boolean>(ALLOW_GUEST, [
            context.getHandler(),
            context.getClass(),
        ]); // method and class
        const allowGuest = methodGuest ?? defaultGuest;
        const request = this.getRequest(context);
        const response = this.getResponse(context);

        const requestToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
        const isFromService =
            this.IPprefixes.some((prefix) => request.headers.host.startsWith(prefix)) &&
            !isNil(requestToken);
        const cookieToken = (request as FastifyRequest).cookies.auth_token;

        const token = isFromService ? requestToken : cookieToken;

        if (isNil(token) && !allowGuest) return false;
        // 判断token是否存在,如果不存在则认证失败
        const accessToken = isNil(token)
            ? undefined
            : await this.tokenService.checkAccessToken(token!);

        if (isNil(accessToken) && !allowGuest) throw new UnauthorizedException();
        try {
            // 检测token是否为损坏或过期的无效状态
            const result = await super.canActivate(context);
            if (allowGuest) return true;
            return result as boolean;
        } catch (e) {
            // 是否存在访问token即为是否存在刷新token
            if (!isNil(accessToken)) {
                // 如果是服务端不进行生成新cookie，删除等操作，IP白名单直接放行
                if (isFromService) {
                    return this.tokenService.checkRefreshToken(accessToken);
                }
                // 如果是客户端即使allowGuest,也为其刷新cookie
                const newToken = await this.tokenService.refreshToken(accessToken, response);

                if (isNil(newToken)) {
                    // 刷新token失败,如果允许游客访问，那么返回 true，否则返回 false
                    return allowGuest;
                }
                // 刷新token 成功
                if (newToken.accessToken) {
                    request.headers.authorization = `Bearer ${newToken.accessToken.value}`; // 策略中，获取jwt以请求头的优先
                }
                // 再次认证一下
                const result = await super.canActivate(context);
                return allowGuest || result;
            }
            // 如果不存在访问令牌，那么返回是否允许游客访问的结果
            return allowGuest;
        }
    }

    /**
     * 自动请求处理
     * 如果请求中有错误则抛出错误
     * 如果请求中没有用户信息则抛出401异常
     * @param err
     * @param user
     * @param _info
     */
    handleRequest(err: any, user: any, _info: Error) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }

    getRequest(context: ExecutionContext) {
        return context.switchToHttp().getRequest();
    }

    getResponse(context: ExecutionContext) {
        return context.switchToHttp().getResponse();
    }
}
