import { Controller } from '@nestjs/common';
import { TsRest, TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';
import { apiBlog } from '@api-contracts';

import { User } from '@prisma/client/blog';

import { UserService } from '../services';
import { ReqUser } from '../decorators';
import { PermissionChecker } from '../../rbac/types';
import { PermissionAction } from '../../rbac/constants';
import { Permission } from '../../rbac/decorators';

const adminChecker: PermissionChecker = async (ab) => ab.can(PermissionAction.MANAGE, 'all');
/**
 * 账户中心控制器
 */

const c = nestControllerContract(apiBlog.user);
@Controller()
@TsRest({ jsonQuery: true })
export class UserController {
    constructor(protected readonly userService: UserService) {}

    @TsRestHandler(c.getUserProfile)
    async getUserProfile(@ReqUser() user: ClassToPlain<User>) {
        return tsRestHandler(c.getUserProfile, async () => {
            return {
                status: 200 as const,
                body: user,
            };
        });
    }

    @Permission(adminChecker)
    @TsRestHandler(c.getUsers)
    async getUsers() {
        return tsRestHandler(c.getUsers, async ({ query: { take, skip } }) => {
            const { users, total } = await this.userService.users({
                take,
                skip,
                orderBy: {
                    createdAt: 'desc',
                },
            });

            return { status: 200 as const, body: { users, count: total, skip, take } };
        });
    }
}
