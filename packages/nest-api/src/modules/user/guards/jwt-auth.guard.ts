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

    IPprefixes = ['127.0.0.1'];

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
        // if (!request.headers.authorization) return false;
        // 从请求头中获取token，且请求头的优先处理，如有，直接不出来cookie
        // 如果请求头不含有authorization字段则认证失败
        const requestToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

        const cookieToken = (request as FastifyRequest).cookies.auth_token;

        let token = requestToken;
        if (isNil(token)) {
            token = cookieToken;
        }
        if (isNil(token) && !allowGuest) return false;
        // 判断token是否存在,如果不存在则认证失败
        const accessToken = isNil(token)
            ? undefined
            : await this.tokenService.checkAccessToken(token!);

        if (isNil(accessToken) && !allowGuest) throw new UnauthorizedException();
        try {
            // 检测token是否为损坏或过期的无效状态,如果无效则尝试刷新token

            const result = await super.canActivate(context);

            if (allowGuest) return true;
            return result as boolean;
        } catch (e) {
            // 尝试通过refreshToken刷新token
            // 刷新成功则给请求头更换新的token
            // 并给响应头添加新的token和refreshtoken
            if (!isNil(accessToken)) {
                if (!isNil(requestToken)) {
                    console.log('===================================================');
                    console.log(request);
                    console.log('===================================================');
                }
                const isFromService = this.IPprefixes.some((prefix) =>
                    request.headers.host.startsWith(prefix),
                );
                const newTokenOrAllowServer = await this.tokenService.refreshToken(
                    accessToken,
                    response,
                    isFromService,
                );

                if (isNil(newTokenOrAllowServer) && !allowGuest) return false;

                if (newTokenOrAllowServer === true) {
                    return true;
                }
                if (newTokenOrAllowServer.accessToken) {
                    request.headers.authorization = `Bearer ${newTokenOrAllowServer.accessToken.value}`; // 策略中，获取jwt以请求头的优先
                }
                // 刷新失败则再次抛出认证失败的异常
                const result = await super.canActivate(context);
                if (allowGuest) return true;
                return result as boolean;
            }

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
