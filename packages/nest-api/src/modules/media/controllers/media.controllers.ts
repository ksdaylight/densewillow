import { Body, Controller } from '@nestjs/common';
import { nestControllerContract, tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { apiBlog } from 'api-contracts';

import { MultipartFile } from '@fastify/multipart';

import { MediaService } from '../services';

const c = nestControllerContract(apiBlog);
// type RequestShapes = NestRequestShapes<typeof c>;

@Controller()
export class AppController {
    constructor(private readonly meidaService: MediaService) {}

    @TsRestHandler(c.postFileTest)
    async postFileTest(@Body() image: MultipartFile) {
        return tsRestHandler(c.postFileTest, async ({ body }) => {
            // const test = await this.meidaService.upload({
            //     file: image,
            //     dir: 'test',
            // });
            const test = await this.meidaService.upload({
                file: Object.values(body)[0],
                dir: 'test',
            });
            return {
                status: 201 as const,
                body: {
                    id: test.id,
                    file: test.file,
                    ext: test.ext,
                    date: test.createdAt,
                },
            };
        });
    }

    @TsRestHandler(c.testGet)
    async getTest() {
        return tsRestHandler(c.testGet, async () => {
            return { status: 200, body: 'test success' };
        });
    }
}
