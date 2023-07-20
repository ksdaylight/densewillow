import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../core/providers';

@Injectable()
export class RoleService {
    constructor(protected prisma: PrismaService) {}
}
