import { AbilityOptions, AbilityTuple, MongoQuery, RawRuleFrom, SubjectType } from '@casl/ability';
import { Injectable, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';
import { isNil, omit, isArray } from 'lodash';

import { Prisma, User } from '@prisma/client/blog';

import { Configure } from '../core/configure';

import { getUserConfig } from '../user/helpers';
import { UserConfig } from '../user/types';

import { deepMerge } from '../core/helpers';

import { PrismaService } from '../core/providers';

import { SystemRoles } from './constants';
import { PermissionType, RoleType } from './types';

const getSubject = <S extends SubjectType>(subject: S) => {
    if (typeof subject === 'string') return subject;
    if (subject.modelName) return subject;
    return subject.name;
};
@Injectable()
export class RbacResolver<A extends AbilityTuple = AbilityTuple, C extends MongoQuery = MongoQuery>
    implements OnApplicationBootstrap
{
    protected isSetUp = false;

    protected options?: AbilityOptions<A, C>;

    protected _roles: RoleType[] = [
        {
            name: SystemRoles.USER,
            label: '普通用户',
            description: '新用户的默认角色',
            permissions: [],
        },
        {
            name: SystemRoles.ADMIN,
            label: '超级管理员',
            description: '拥有整个系统的管理权限',
            permissions: [],
        },
    ];

    protected _permissions: PermissionType<A, C>[] = [
        {
            name: 'system-manage',
            label: '系统管理',
            description: '管理系统的所有功能',
            rule: {
                action: 'manage',
                subject: 'all',
            } as Omit<RawRuleFrom<A, C>, 'conditions'> & {
                conditions?: (user: ClassToPlain<User>) => Record<string, any>;
            },
        },
    ];

    constructor(protected prisma: PrismaService, protected configure: Configure) {}

    setOptions(options: AbilityOptions<A, C>) {
        if (!this.isSetUp) {
            this.options = options;
            this.isSetUp = true;
        }
        return this;
    }

    get roles() {
        return this._roles;
    }

    get permissions() {
        return this._permissions;
    }

    addRoles(data: RoleType[]) {
        this._roles = [...this.roles, ...data];
    }

    addPermissions(data: PermissionType<A, C>[]) {
        this._permissions = [...this.permissions, ...data].map((item) => {
            let subject: typeof item.rule.subject;
            if (isArray(item.rule.subject)) subject = item.rule.subject.map((v) => getSubject(v));
            else subject = getSubject(item.rule.subject);
            const rule = { ...item.rule, subject };
            return { ...item, rule };
        });
    }

    async onApplicationBootstrap() {
        if (!(await this.configure.get<boolean>('app.server', true))) return null;

        try {
            await this.prisma.$transaction(async (tx) => {
                await this.syncRoles(tx);
                await this.syncPermissions(tx);
            });
        } catch (err) {
            console.log(err);
        }

        return true;
    }

    /**
     * 同步角色
     * @param prisma
     */
    protected async syncRoles(prisma: Prisma.TransactionClient) {
        this._roles = this.roles.reduce((o, n) => {
            if (o.map(({ name }) => name).includes(n.name)) {
                return o.map((e) => (e.name === n.name ? deepMerge(e, n, 'merge') : e));
            }
            return [...o, n];
        }, [] as RoleType[]);
        for (const item of this.roles) {
            let role = await prisma.role.findFirst({
                where: {
                    name: item.name,
                },
            });

            if (isNil(role)) {
                role = await prisma.role.create({
                    data: {
                        name: item.name,
                        label: item.label,
                        description: item.description,
                        systemic: true,
                    },
                });
            } else {
                await prisma.role.update({
                    where: { id: role.id },
                    data: {
                        systemic: true,
                    },
                });
            }
        }

        const systemRoles = await prisma.role.findMany({ where: { systemic: true } });
        const toDeles: string[] = [];
        for (const sRole of systemRoles) {
            if (isNil(this.roles.find(({ name }) => sRole.name === name))) toDeles.push(sRole.id);
        }
        if (toDeles.length > 0) await prisma.role.deleteMany({ where: { id: { in: toDeles } } });
    }

    /**
     * 同步权限
     * @param prisma
     */
    protected async syncPermissions(prisma: Prisma.TransactionClient) {
        const superAdmin = await getUserConfig<UserConfig['super']>('super');
        const permissions = await prisma.permission.findMany();
        const roles = await prisma.role.findMany({
            include: { permissions: true },
            where: {
                name: {
                    not: SystemRoles.ADMIN,
                },
            },
        });

        this._permissions = this.permissions.reduce(
            (o, n) => (o.map(({ name }) => name).includes(n.name) ? o : [...o, n]),
            [] as PermissionType<A, C>[],
        );
        const names = this.permissions.map(({ name }) => name);

        /** *********** 同步权限  ************ */

        for (const item of this.permissions) {
            const permission = omit(item, ['conditions']);
            const old = await prisma.permission.findFirst({
                where: {
                    name: permission.name,
                },
            });
            if (isNil(old)) {
                await prisma.permission.create({
                    data: {
                        name: permission.name!,
                        label: permission.label,
                        description: permission.description,
                        rule: JSON.stringify(permission.rule),
                    },
                });
            } else {
                await prisma.permission.update({
                    where: { id: old.id },
                    data: {
                        name: permission.name,
                        label: permission.label,
                        description: permission.description,
                        rule: JSON.stringify(permission.rule),
                    },
                });
            }
        }

        const toDeles: string[] = [];
        for (const item of permissions) {
            if (!names.includes(item.name) && item.name !== 'system-manage') toDeles.push(item.id);
        }
        if (toDeles.length > 0)
            await prisma.permission.deleteMany({ where: { id: { in: toDeles } } });

        for (const role of roles) {
            const rolePermissions = await prisma.permission.findMany({
                where: {
                    name: {
                        in: this.roles.find(({ name }) => name === role.name)?.permissions,
                    },
                },
            });
            // 删除旧的与当前 role 相关的所有权限
            await prisma.rolesPermissions.deleteMany({
                where: {
                    roleId: role.id,
                },
            });

            // 添加新的与当前 role 相关的所有权限
            for (const perm of rolePermissions) {
                await prisma.rolesPermissions.create({
                    data: {
                        roleId: role.id,
                        permissionId: perm.id,
                        assignedBy: 'system',
                        assignedAt: new Date(),
                    },
                });
            }
        }

        const superRole = await prisma.role.findFirst({
            where: { name: SystemRoles.ADMIN },
        });
        const systemManage = await prisma.permission.findFirst({
            where: { name: 'system-manage' },
        });
        if (isNil(superRole) || isNil(systemManage)) throw NotFoundException;
        // 删除旧的与当前 role 相关的所有权限

        await prisma.rolesPermissions.deleteMany({
            where: {
                roleId: superRole.id,
            },
        });

        // 添加新的与当前 role 相关的所有权限
        await prisma.rolesPermissions.create({
            data: {
                roleId: superRole.id,
                permissionId: systemManage.id,
                assignedBy: 'system',
                assignedAt: new Date(),
            },
        });

        const superUser = await prisma.user.findUnique({
            where: { email: superAdmin.email },
        });

        if (superUser) {
            await prisma.usersRoles.deleteMany({
                where: {
                    userId: superUser.id,
                },
            });

            // 添加新的与当前 role 相关的所有权限
            await prisma.usersRoles.create({
                data: {
                    roleId: superRole.id,
                    userId: superUser.id,
                    assignedBy: 'system',
                    assignedAt: new Date(),
                },
            });
        }
    }
}
