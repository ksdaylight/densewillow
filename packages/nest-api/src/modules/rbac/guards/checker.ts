import { createMongoAbility, MongoAbility } from '@casl/ability';

import { ExecutionContext, NotFoundException } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { FastifyRequest as Request } from 'fastify';
import { isNil } from 'lodash';

import { Permission, Prisma } from '@prisma/client/blog';

import { PERMISSION_CHECKERS } from '../constants';
import { RbacResolver } from '../rbac.resolver';
import { PermissionChecker } from '../types';
import { PrismaService } from '../../core/providers';

type CheckerParams = {
    resolver: RbacResolver;
    checkers: PermissionChecker[];
    moduleRef: ModuleRef;
    prisma: PrismaService;
    userId: string;
    request?: any;
};

export const getCheckers = (context: ExecutionContext, reflector: Reflector) => {
    const defaultCheckers = reflector.getAllAndOverride<PermissionChecker[]>(PERMISSION_CHECKERS, [
        context.getHandler(),
        context.getClass(),
    ]);

    return defaultCheckers;
};

export const solveChecker = async ({
    checkers,
    moduleRef,
    resolver,
    userId,
    request,
    prisma,
}: CheckerParams) => {
    const userDetail = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            permissions: {
                include: {
                    permission: true,
                },
            },
            roles: {
                include: {
                    role: {
                        include: {
                            permissions: {
                                include: {
                                    permission: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    if (isNil(userDetail)) throw NotFoundException;
    // let permissions = [
    //     ...userDetail.permissions,
    //     ...userDetail.roles.flatMap((role) => role.permissions),
    // ];
    // 用于解析 rule 字符串
    function parseRule(rule: string | Prisma.JsonValue): Prisma.JsonValue {
        // 如果 rule 是字符串，解析为对象；如果已经是对象，直接返回
        return typeof rule === 'string' ? JSON.parse(rule) : rule;
    }
    let permissions = [
        ...userDetail.permissions.map((p) => ({
            ...p.permission,
            rule: parseRule(p.permission.rule),
        })),
        ...userDetail.roles.flatMap((role) =>
            role.role.permissions.map((p) => ({
                ...p.permission,
                rule: parseRule(p.permission.rule),
            })),
        ),
    ];
    permissions = permissions = permissions.reduce((o, n) => {
        if (o.find(({ name }) => name === n.name)) return o;
        return [...o, n];
    }, [] as Permission[]);

    const ability = createMongoAbility(
        permissions.map(({ rule, name }) => {
            const resolve = resolver.permissions.find((p) => p.name === name);
            if (!isNil(resolve) && !isNil(resolve.rule.conditions)) {
                return { ...(rule as any), conditions: resolve.rule.conditions(userDetail) };
            }
            return rule;
        }),
    );
    const results = await Promise.all(
        checkers.map(async (checker) => execChecker(checker, ability, moduleRef, request)),
    );
    // console.dir(results);
    return results.every((r) => !!r);
};

const execChecker = (
    checker: PermissionChecker,
    ability: MongoAbility,
    moduleRef: ModuleRef,
    request?: Request,
) => {
    if (typeof checker === 'function') return checker(ability, moduleRef, request);
    return checker.handle(ability, moduleRef, request);
};
