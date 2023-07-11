import { FastifyMultipartBaseOptions, MultipartFile } from '@fastify/multipart';
import { has, isArray } from 'lodash';

type FileLimit = Pick<FastifyMultipartBaseOptions['limits'], 'fileSize' | 'files'> & {
    mimetypes?: string[];
};

const checkFileAndLimit = (file: MultipartFile, limits: FileLimit = {}) => {
    if (!('mimetype' in file)) return false;
    if (limits.mimetypes && !limits.mimetypes.includes(file.mimetype)) return false;
    if (has(file, '_buf') && Buffer.byteLength((file as any)._buf) > limits.fileSize) return false;
    return true;
};

export function isValidFile(value: MultipartFile, limits: FileLimit = {}): boolean {
    const filesLimit = limits.files ?? 0;
    if (filesLimit > 0 && isArray(value) && value.length > filesLimit) return false;
    return checkFileAndLimit(value, limits);
}
