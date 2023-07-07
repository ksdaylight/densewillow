import { extname, join } from 'path';

import util from 'util';

import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { createReadStream, existsSync, removeSync } from 'fs-extra';
import { isNil } from 'lodash';
import { lookup } from 'mime-types';

import { MediaEntity, Prisma } from '@prisma/client/blog';

import { CreateFileOptions, UploadFileType } from '../types';
import { Configure } from '../../core/configure';
import { PrismaService } from '../../core/providers';
import { uploadLocalFile } from '../helpers';
import { App } from '../../core/app';
/**
 * 文件服务
 */
@Injectable()
export class MediaService {
    constructor(protected configure: Configure, protected prisma: PrismaService) {}

    /**
     * 上传文件
     * @param param0
     */
    async upload({ file, dir }: CreateFileOptions) {
        if (isNil(file)) throw new NotFoundException('Have not any file to upload!');
        // console.log(JSON.stringify(file, null, 2));
        console.log(util.inspect(file, { showHidden: false, depth: null }));
        const uploader: UploadFileType = {
            filename: file.filename,
            mimetype: file.mimetype,
            value: (await file.toBuffer()).toString('base64'),
        };
        // const item = new MediaEntity();

        const uploadFile = await uploadLocalFile(uploader, dir);

        // await MediaEntity.save(item);

        const inputData: Prisma.MediaEntityCreateInput = {
            file: uploadFile,
            ext: extname(uploadFile),
        };

        return this.prisma.mediaEntity.create({
            data: inputData,
        });
    }

    async deleteMedia(where: Prisma.MediaEntityWhereUniqueInput): Promise<MediaEntity> {
        const deleteMedia = await this.prisma.mediaEntity.delete({
            where,
        });
        const { file } = deleteMedia;
        const filePath = join(await App.configure.get('media.upload'), file);
        if (existsSync(filePath)) removeSync(filePath);
        return deleteMedia;
    }

    /**
     * 加载图片
     * @param id 图片ID
     * @param res http响应实例
     * @param ext 图片后缀
     */
    async loadImage(id: Prisma.MediaEntityWhereUniqueInput, res: FastifyReply, ext?: string) {
        const media = await this.prisma.mediaEntity.findUnique({ where: id });
        const filePath = join(await this.configure.get('media.upload'), media.file);
        if (!existsSync(filePath) || (ext && extname(filePath) !== ext)) {
            throw new NotFoundException('file not exists!');
        }
        const image = createReadStream(filePath);
        res.type(lookup(filePath) as string);
        return new StreamableFile(image);
    }
}
