import { AbilityTuple, MongoAbility, MongoQuery, RawRuleFrom } from '@casl/ability';
import { ModuleRef } from '@nestjs/core';
import { Permission, Role, User } from '@prisma/client/blog';
import { FastifyRequest as Request } from 'fastify';

export type RoleType = Pick<ClassToPlain<Role>, 'name' | 'label' | 'description'> & {
    permissions: string[];
};

export type PermissionType<A extends AbilityTuple, C extends MongoQuery> = Pick<
    ClassToPlain<Permission>,
    'name'
> &
    Partial<Pick<ClassToPlain<Permission>, 'label' | 'description'>> & {
        rule: Omit<RawRuleFrom<A, C>, 'conditions'> & {
            conditions?: (user: ClassToPlain<User>) => Record<string, any>;
        };
    };

interface PermissionCheckerClass {
    handle(ability: MongoAbility, ref: ModuleRef, request?: Request): Promise<boolean>;
}

type PermissionCheckerCallback = (
    ability: MongoAbility,
    ref: ModuleRef,
    request?: Request,
) => Promise<boolean>;

export type PermissionChecker = PermissionCheckerClass | PermissionCheckerCallback;
