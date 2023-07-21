import { AbilityOptions, AbilityTuple, MongoQuery, SubjectType } from '@casl/ability';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { isNil, omit, isArray } from 'lodash';

import { Prisma } from '@prisma/client/blog';

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

    protected options: AbilityOptions<A, C>;

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
            } as any,
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
        }, []);
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
            [],
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
                        name: permission.name,
                        label: permission.label,
                        description: permission.description,
                        rule: permission.rule as any,
                    },
                });
            } else {
                await prisma.permission.update({
                    where: { id: old.id },
                    data: {
                        name: permission.name,
                        label: permission.label,
                        description: permission.description,
                        rule: permission.rule as any,
                    },
                });
            }
        }

        // 删除冗余权限
        const toDeles: string[] = [];
        for (const item of permissions) {
            if (!names.includes(item.name) && item.name !== 'system-manage') toDeles.push(item.id);
        }
        if (toDeles.length > 0)
            await prisma.permission.deleteMany({ where: { id: { in: toDeles } } });

        /** *********** 同步普通角色  ************ */
        for (const role of roles) {
            const rolePermissions = await prisma.permission.findMany({
                where: {
                    name: {
                        in: this.roles.find(({ name }) => name === role.name).permissions,
                    },
                },
            });
            await prisma.role.update({
                where: { id: role.id },
                data: {
                    permissions: {
                        set: rolePermissions.map(({ id }) => ({
                            id,
                        })),
                    },
                },
            });
        }

        /** *********** 同步超级管理员角色  ************ */

        // 查询出超级管理员角色
        const superRole = await prisma.role.findFirst({
            where: { name: 'super-admin' },
        });
        const systemManage = await prisma.permission.findFirst({
            where: { name: 'system-manage' },
        });

        // 添加系统管理权限到超级管理员角色
        await prisma.role.update({
            where: { id: superRole.id },
            data: {
                permissions: {
                    set: [{ id: systemManage.id }],
                },
            },
        });

        /** *********** 添加超级管理员角色到初始用户  ************ */

        const superUser = await prisma.user.findUnique({
            where: { email: superAdmin.email },
        });

        if (superUser) {
            await prisma.user.update({
                where: { id: superUser.id },
                data: {
                    roles: {
                        set: [{ id: superRole.id }],
                    },
                },
            });
        }
    }
}
