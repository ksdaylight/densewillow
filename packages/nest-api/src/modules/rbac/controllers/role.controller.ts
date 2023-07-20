import { Controller } from '@nestjs/common';

import { RoleService } from '../services/role.service';

// const permissions: PermissionChecker[] = [
//     async (ab) => ab.can(PermissionAction.MANAGE, RoleEntity.name),
// ];

@Controller()
export class RoleController {
    constructor(protected roleService: RoleService) {}
}
