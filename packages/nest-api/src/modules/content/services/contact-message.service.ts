import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client/blog';

import { PrismaService } from '../../core/providers';

@Injectable()
export class ContactMessageService {
    constructor(protected prisma: PrismaService) {}

    async createContactMessage(args: Prisma.ContactMessageCreateArgs) {
        return this.prisma.contactMessage.create(args);
    }
}
