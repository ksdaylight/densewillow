import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../core/providers';

@Injectable()
export class PermissionService {
    constructor(protected prisma: PrismaService) {}
}
