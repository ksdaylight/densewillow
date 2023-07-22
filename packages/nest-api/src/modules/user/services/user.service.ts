import { ForbiddenException, Injectable, OnModuleInit } from '@nestjs/common';
import { isNil } from 'lodash';

import { Prisma, User } from '@prisma/client/blog';

import { getUserConfig } from '../helpers';
import { UserConfig } from '../types';
import { PrismaService } from '../../core/providers';
import { Configure } from '../../core/configure';
import { SystemRoles } from '../../rbac/constants';

/**
 * 用户管理服务
 */
@Injectable()
export class UserService implements OnModuleInit {
    constructor(protected configure: Configure, protected prisma: PrismaService) {}

    async onModuleInit() {
        if (!(await this.configure.get<boolean>('app.server', true))) return null;
        const adminConf = await getUserConfig<UserConfig['super']>('super');
        const admin = await this.detail({ email: adminConf.email });
        if (!isNil(admin)) {
            if (admin.provider !== 'creator') {
                await this.prisma.user.update({
                    data: { provider: 'creator' },
                    where: {
                        id: admin.id,
                    },
                });
                return this.prisma.user.findUnique({ where: { email: adminConf.email } });
            }
            return admin;
        }
        return this.create({
            email: adminConf.email,
            name: 'admin',
            provider: 'creator',
            activated: true,
        });
    }

    /**
     * 创建用户
     * @param data
     */
    async create(data: Prisma.UserCreateInput) {
        const user = await this.prisma.user.create({
            data,
        });
        await this.syncActivated(await this.detail({ id: user.id }));
        return this.detail({ id: user.id });
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { data, where } = params;
        await this.syncActivated(await this.detail(where));
        return this.prisma.user.update({
            data,
            where,
        });
    }

    async detail(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
            include: {
                posts: true,
                permissions: true,
                roles: {
                    include: {
                        permissions: true,
                    },
                },
                likedPosts: true,
            },
        });
    }

    protected async syncActivated(user: User) {
        if (user.activated) {
            const userRoles = await this.prisma.role.findMany({
                where: {
                    id: {
                        in: user.roleIDs,
                    },
                },
            });
            const roleNames = (userRoles ?? []).map(({ name }) => name);
            const noRoles =
                roleNames.length <= 0 ||
                (!roleNames.includes(SystemRoles.USER) && !roleNames.includes(SystemRoles.ADMIN));

            const isSuperAdmin = roleNames.includes(SystemRoles.ADMIN);

            if (noRoles) {
                const customRole = await this.prisma.role.findFirst({
                    where: { name: SystemRoles.USER },
                });
                if (!isNil(customRole)) {
                    await this.prisma.user.update({
                        where: { id: user.id },
                        data: {
                            roles: {
                                connect: { id: customRole.id },
                            },
                        },
                    });
                }
            } else if (isSuperAdmin) {
                const adminRole = await this.prisma.role.findFirst({
                    where: { name: SystemRoles.ADMIN },
                });
                if (!isNil(adminRole)) {
                    await this.prisma.user.update({
                        where: { id: user.id },
                        data: {
                            roles: {
                                set: [{ id: adminRole.id }],
                            },
                        },
                    });
                }
            }
        } else {
            await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    roles: {
                        set: [],
                    },
                    permissions: {
                        set: [],
                    },
                },
            });
        }
    }

    async users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }) {
        const { skip, take, cursor, where, orderBy } = params;

        const users = await this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
        const total = await this.prisma.mediaEntity.count({
            where: where || undefined,
        });
        return { users, total };
    }

    /**
     * 获取当前用户
     * @param condition
     * @param callback
     */
    async getCurrentUser(user?: ClassToPlain<User>): Promise<User> {
        return this.prisma.user.findUniqueOrThrow({ where: { id: user.id } });
    }

    async getCurrentUserWithPermission(user?: ClassToPlain<User>): Promise<User> {
        return this.prisma.user.findUniqueOrThrow({
            include: {
                permissions: true,
                roles: {
                    include: {
                        permissions: true,
                    },
                },
            },
            where: { id: user.id },
        });
    }

    async delete(items: string[]) {
        const users = await this.prisma.user.findMany({
            where: {
                id: {
                    in: items,
                },
            },
        });

        for (const user of users) {
            if (user.provider === 'creator')
                throw new ForbiddenException('Can not delete  super admin user!');
        }

        await this.prisma.user.deleteMany({
            where: {
                id: {
                    in: items,
                },
            },
        });

        return users;
    }
}
