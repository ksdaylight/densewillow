import { MultipartFile } from '@fastify/multipart';

/**
 * 媒体模块配置
 */
export interface MediaConfig {
    /**
     * 文件上传路径
     */
    upload?: string;
}

/**
 * 上传的文件实例选项
 */
export interface UploadFileType {
    /**
     * 文件名称
     */
    filename: string;
    /**
     * 文件的mimetype
     */
    mimetype: string;
    /**
     * 文件的buffer字符
     */
    value: string;
}

/**
 * 创建文件数据的选项
 */
export interface CreateFileOptions {
    /**
     * 上传的文件
     */
    file: MultipartFile;
    /**
     * 存放的相对目录
     */
    dir?: string;
}
