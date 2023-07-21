import { createMongoAbility, MongoAbility } from '@casl/ability';

import { ExecutionContext } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { FastifyRequest as Request } from 'fastify';
import { isNil } from 'lodash';

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
            permissions: true,
            roles: {
                include: {
                    permissions: true,
                },
            },
        },
    });
    let permissions = [
        ...userDetail.permissions,
        ...userDetail.roles.flatMap((role) => role.permissions),
    ];

    permissions = permissions.reduce((o, n) => {
        if (o.find(({ name }) => name === n.name)) return o;
        return [...o, n];
    }, []);
    const ability = createMongoAbility(
        permissions.map(({ rule, name }) => {
            const parsedRule = JSON.parse(rule as string);
            const resolve = resolver.permissions.find((p) => p.name === name);
            if (!isNil(resolve) && !isNil(resolve.rule.conditions)) {
                return { ...parsedRule, conditions: resolve.rule.conditions(userDetail) };
            }
            return parsedRule;
        }),
    );
    const results = await Promise.all(
        checkers.map(async (checker) => execChecker(checker, ability, moduleRef, request)),
    );
    console.dir(results);
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
