import { Controller } from '@nestjs/common';

import { TsRest, TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';

import { apiBlog } from '@api-contracts';

import { ContactMessageService } from '../services';

const c = nestControllerContract(apiBlog.portfolio);

// const testChecker: PermissionChecker = async (ab) => ab.can(PermissionAction.MANAGE, 'all');

@Controller()
@TsRest({ jsonQuery: true })
export class ContactMessageController {
    constructor(private readonly contactMessageService: ContactMessageService) {}

    @TsRestHandler(c.addContactMessage)
    async createChiefComment() {
        return tsRestHandler(c.addContactMessage, async ({ body }) => {
            try {
                const newMessage = await this.contactMessageService.createContactMessage(body);
                return { status: 201 as const, body: newMessage };
            } catch (error) {
                return { status: 400 as const, body: { message: `${(error as Error).message}` } };
            }
        });
    }
}
