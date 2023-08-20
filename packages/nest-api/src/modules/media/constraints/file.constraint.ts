import { MultipartFile } from '@fastify/multipart';
import { has, isArray } from 'lodash';

type FileLimit = {
    fileSize?: number;
    files?: number;
    mimetypes?: string[];
};

const checkFileAndLimit = (file: MultipartFile, limits: FileLimit = { fileSize: 0, files: 0 }) => {
    if (!('mimetype' in file)) return false;
    if (limits.mimetypes && !limits.mimetypes.includes(file.mimetype)) return false;
    if (has(file, '_buf') && Buffer.byteLength((file as any)._buf) > (limits.fileSize || 0))
        return false;
    return true;
};

export function isValidFile(
    value: MultipartFile,
    limits: FileLimit = { fileSize: 0, files: 0 },
): boolean {
    const filesLimit = limits.files ?? 0;
    if (filesLimit > 0 && isArray(value) && value.length > filesLimit) return false;
    return checkFileAndLimit(value, limits);
}
