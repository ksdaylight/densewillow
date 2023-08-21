import { Controller, Res } from '@nestjs/common';
import {
    nestControllerContract,
    NestRequestShapes,
    tsRestHandler,
    TsRestHandler,
} from '@ts-rest/nest';
import { apiBlog } from '@api-contracts';

import { FastifyReply } from 'fastify';

import { MediaService } from '../services';
import { isValidFile } from '../constraints';
import { Guest } from '../../user/decorators';

const c = nestControllerContract(apiBlog.images);
type RequestShapes = NestRequestShapes<typeof c>;

@Controller()
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @Guest()
    @TsRestHandler(c.getImages)
    async getImage() {
        return tsRestHandler(c.getImages, async ({ query: { take, skip } }) => {
            const { media, totalMedia } = await this.mediaService.media({
                take,
                skip,
                orderBy: {
                    createdAt: 'desc',
                },
            });

            return {
                status: 200 as const,
                body: { images: media, count: totalMedia, skip, take },
            };
        });
    }

    @TsRestHandler(c.uploadImage)
    async uploadImage() {
        return tsRestHandler(c.uploadImage, async ({ body }) => {
            const check = isValidFile(Object.values(body)[0], {
                mimetypes: ['image/png', 'image/gif', 'image/jpeg', 'image/webp', 'image/svg+xml'],
                fileSize: 1024 * 1024 * 5,
            });
            if (!check) {
                return { status: 400, body: { message: '请上传5M以内的，图片格式的文件' } };
            }
            const imageEntity = await this.mediaService.upload({
                file: Object.values(body)[0],
                dir: 'post',
            });
            return {
                status: 201 as const,
                body: imageEntity,
            };
        });
    }

    @Guest()
    @TsRestHandler(c.loadImage)
    async loadImage(@Res({ passthrough: true }) res: FastifyReply) {
        return tsRestHandler(c.loadImage, async ({ params }: RequestShapes['loadImage']) => {
            return {
                status: 200,
                body: await this.mediaService.loadImage({ id: params.id }, res, `.${params.ext}`),
            };
        });
    }
}
