import { randomBytes } from 'crypto';

import { extname, join, resolve } from 'path';

import { ensureDirSync, writeFileSync } from 'fs-extra';
import { get, isNil } from 'lodash';

import { media } from '@/config';
import { getTime } from '@/modules/core/helpers';

import { MediaConfig, UploadFileType } from './types';

/**
 * 上传文件
 * @param file 文件上传配置
 * @param dir 上传相对目录
 */
export function uploadLocalFile(file: UploadFileType, dir?: string) {
    // 获取文件总存储路径
    const uploadConfig = getMediaConfig<string>('upload');
    // 上传文件的目录
    const uploadPath = isNil(dir) ? uploadConfig : join(uploadConfig, dir);
    // 使用base64解码上传文件的内容
    const buff = Buffer.from(file.value, 'base64');
    // 如果上传目录不存在则创建
    ensureDirSync(uploadPath, 0o2775);
    // 根据当前时间生成文件名
    const filename = `${getTime().format('YYYYMMDDHHmmss')}${randomBytes(4)
        .toString('hex')
        .slice(0, 8)}${extname(file.filename)}`;
    // 最终文件存放的路径
    const filePath = join(uploadPath, filename);
    // 写入文件
    writeFileSync(filePath, buff);
    // 返回文件相对于总存储路径的相对位置
    return isNil(dir) ? filename : join(dir, filename);
}

export function getMediaConfig<T>(key?: string, defaultValue?: T): T {
    const config = media();
    return key ? get(config, key, defaultValue) : (config as T);
}

/**
 * 默认媒体模块配置
 */
export function defaultMediaConfig(): Required<MediaConfig> {
    return {
        relations: [],
        upload: resolve(__dirname, '../../../uploads'),
    };
}
