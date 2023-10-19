import { Controller } from '@nestjs/common';

import { TsRest, TsRestHandler, nestControllerContract, tsRestHandler } from '@ts-rest/nest';

import { apiBlog } from '@api-contracts';

import { Guest } from '../../user/decorators';

import { ZodTestService } from '../services';

const c = nestControllerContract(apiBlog.zodTest);
@Controller()
@TsRest({ jsonQuery: true })
export class ZodTestController {
    constructor(private readonly zodTestService: ZodTestService) {}

    @Guest()
    @TsRestHandler(c.getPostUniqueZod)
    async getTest() {
        return tsRestHandler(c.getPostUniqueZod, async ({ body }) => {
            const post = await this.zodTestService.post(body);
            console.log('test zod success \n');
            return { status: 200, body: post };
        });
    }
}
