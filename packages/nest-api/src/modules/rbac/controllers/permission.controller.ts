import { Controller } from '@nestjs/common';

import { PermissionService } from '../services/permission.service';

// const permissions: PermissionChecker[] = [
//     async (ab) => ab.can(PermissionAction.MANAGE, PermissionEntity.name),
// ];

@Controller()
export class PermissionController {
    constructor(protected permissionService: PermissionService) {}
}
