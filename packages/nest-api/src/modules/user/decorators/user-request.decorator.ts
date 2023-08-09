import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client/blog';
import { isNil } from 'lodash';

/**
 * 当前用户装饰器
 * 通过request查询通过jwt解析出来的当前登录的ID查询当前用户模型实例
 * 并用于控制器直接注入
 */
export const ReqUser = createParamDecorator(async (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (isNil(request.user)) return null;
    return request.user as ClassToPlain<User>;
});
