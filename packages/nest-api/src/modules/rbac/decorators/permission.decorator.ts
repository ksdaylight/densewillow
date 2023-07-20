import { SetMetadata, Type } from '@nestjs/common';

import { PERMISSION_CHECKERS } from '../constants';

import { PermissionChecker } from '../types';

export const Permission = (...checkers: PermissionChecker[]) =>
    SetMetadata(PERMISSION_CHECKERS, checkers);
export const ManualPermission = (
    target: Type<any>,
    method: string,
    checkers: PermissionChecker[],
) => Reflect.defineMetadata(PERMISSION_CHECKERS, checkers, target.prototype, method);
