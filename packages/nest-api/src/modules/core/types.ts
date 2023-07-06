import { ModuleMetadata, PipeTransform, Type } from '@nestjs/common';

import { NestFastifyApplication } from '@nestjs/platform-fastify';

import dayjs from 'dayjs';

import { Configure } from './configure';
/** ******************** 应用配置  ********************* */

/**
 * 应用配置
 */
export interface AppConfig {
    host: string;

    port: number;

    globalPrefix?: string;

    https: boolean;

    timezone: string;

    locale: string;

    url?: string;

    api?: string;
}

/** ******************** 应用创建  ********************* */
/**
 * 应用创建函数
 */
export interface Creator {
    (): Promise<CreatorData>;
}

/**
 * 创建应用的选项参数
 */
export interface CreateOptions {
    builder: AppBuilder;

    configs: Record<string, any>;

    globals?: {
        pipe?: (params: AppParams) => PipeTransform<any> | null;

        interceptor?: Type<any> | null;

        filter?: Type<any> | null;
    };

    configure?: ConfigStorageOption;

    modules?: ModuleItem[];

    meta?: (params: AppParams) => ModuleMetadata;
}

/**
 * 创建应用后返回的对象
 */
export interface CreatorData extends Required<AppParams> {
    modules: ModuleBuildMap;
}

/**
 * 应用构建器
 */
export interface AppBuilder {
    (params: { configure: Configure; BootModule: Type<any> }): Promise<NestFastifyApplication>;
}

/**
 * 用于传入模块构建器和命令等的参数
 */
export type AppParams = {
    /**
     * 配置服务实例
     */
    configure: Configure;
    /**
     * 应用实例
     */
    app?: NestFastifyApplication;
};

/** ******************** 模块构造  ********************* */
/**
 * 模块类型
 */

export type ModuleItem = Type<any> | ModuleOption;

/**
 * 模块额外的参数
 */
export type ModuleOption = { module: Type<any>; params?: Record<string, any> };

export type ModuleBuildMap = Record<string, { meta: ModuleBuilderMeta; module: Type<any> }>;

/**
 * 模块构建器参数选项
 */
export type ModuleBuilderMeta = ModuleMetadata & {
    global?: boolean;
};

/**
 * 模块构建器
 */
export type ModuleMetaRegister<P extends Record<string, any>> = (
    configure: Configure,
    params: P,
) => ModuleBuilderMeta | Promise<ModuleBuilderMeta>;

/** ******************** 配置系统  ********************* */
export interface ConfigStorageOption {
    enableDynamicStorage?: boolean;

    yamlPath?: string;
}
/**
 * 配置注册器函数
 */
export type ConfigureRegister<T extends Record<string, any>> = (
    configure: Configure,
) => T | Promise<T>;
/**
 * 配置构造器
 */
export interface ConfigureFactory<
    T extends Record<string, any>,
    C extends Record<string, any> = T,
> {
    register: ConfigureRegister<RePartial<T>>;
    defaultRegister?: ConfigureRegister<T>;

    enableDynamicStorage?: boolean;
    hook?: (configure: Configure, value: T) => C | Promise<C>;
    append?: boolean;
}

/** ****************************** 时间  ***************************** */

/**
 * getTime函数获取时间的选项参数
 */
export interface TimeOptions {
    /**
     * 时间
     */
    date?: dayjs.ConfigType;
    /**
     * 输出格式
     */
    format?: dayjs.OptionType;
    /**
     * 语言
     */
    locale?: string;
    /**
     * 是否严格模式
     */
    strict?: boolean;
    /**
     * 时区
     */
    zonetime?: string;
}
