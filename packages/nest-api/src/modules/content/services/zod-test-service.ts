import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client/blog';

import { PrismaService } from '../../core/providers';

@Injectable()
export class ZodTestService {
    constructor(protected prisma: PrismaService) {}

    async post(postUniqueOrThrowArgs: Prisma.PostFindUniqueOrThrowArgs) {
        return this.prisma.post.findUniqueOrThrow(postUniqueOrThrowArgs);
    }
}
