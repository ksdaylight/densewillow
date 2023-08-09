import { Controller } from '@nestjs/common';
import { TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';
import { apiBlog } from '@api-contracts';

import { User } from '@prisma/client/blog';

import { UserService } from '../services';
import { ReqUser } from '../decorators';

/**
 * 账户中心控制器
 */

const c = nestControllerContract(apiBlog.user);
@Controller()
export class UserController {
    constructor(protected readonly userService: UserService) {}

    @TsRestHandler(c.getUserProfile)
    async getUserProfile(@ReqUser() user: ClassToPlain<User>) {
        return tsRestHandler(c.getUserProfile, async () => {
            return {
                status: 200 as const,
                body: { user },
            };
        });
    }

    @TsRestHandler(c.getUsers)
    async getPosts() {
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
