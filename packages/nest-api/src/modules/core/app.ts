/* eslint-disable func-names */
import { exit } from 'process';

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { isNil } from 'lodash';

import { Configure } from './configure';

import { AppConfig, ConfigStorageOption, CreateOptions, CreatorData } from './types';
import { createBootModule } from './helpers';
/**
 * 应用核心类
 * 用于构建应用和配置实例
 */
export class App {
    /**
     * 配置对象
     */
    protected static _configure: Configure;

    /**
     * 应用实例
     */
    protected static _app: NestFastifyApplication;

    static get configure() {
        return this._configure;
    }

    static get app() {
        return this._app;
    }

    /**
     * 创建一个应用
     * @param options 应用创建选项
     */
    static async create(options: CreateOptions): Promise<CreatorData> {
        const { builder, configs, configure } = options;
        let modules = {};
        try {
            this._configure = await this.buildConfigure(configs, configure);
            const { BootModule, modules: maps } = await createBootModule(
                { configure: this._configure },
                options,
            );
            modules = maps;
            // modules = realModules;
            this._app = await builder({
                configure: this._configure,
                BootModule,
            });
            // 允许使用关闭监听的钩子
            this._app.enableShutdownHooks();
            if (this._app.getHttpAdapter() instanceof FastifyAdapter) {
                // 启用文件上传服务
                // eslint-disable-next-line global-require
                this._app.register(require('@fastify/multipart'), {
                    attachFieldsToBody: true,
                });
            }
            // 初始化应用
            if (this._app.getHttpAdapter() instanceof FastifyAdapter) {
                await this._app.init();
            }
            const { globalPrefix } = await this._configure.get<AppConfig>('app');
            if (!isNil(globalPrefix)) this._app.setGlobalPrefix(globalPrefix);
        } catch (error) {
            console.log('Create app failed! \n');
            console.log(error);
            exit(0);
        }

        return { configure: this._configure, app: this._app, modules };
    }

    /**
     * 构建配置实例
     * @param configs 初始配置,一般会传入./configs目录中的所有配置
     * @param option 动态配置存储选项,可以通过yaml来动态存储配置
     */
    static async buildConfigure(configs: Record<string, any>, option?: ConfigStorageOption) {
        const configure = new Configure();
        configure.init(option);
        for (const key in configs) {
            configure.add(key, configs[key]);
        }
        await configure.sync();
        let appUrl = await configure.get('app.url', undefined);
        if (isNil(appUrl)) {
            const host = await configure.get<string>('app.host');
            const port = await configure.get<number>('app.port')!;
            const https = await configure.get<boolean>('app.https');
            const globalPrefix = await configure.get<string>('app.globalPrefix');

            appUrl =
                (await configure.get<boolean>('app.url', undefined)) ??
                `${https ? 'https' : 'http'}://${host!}:${port}${
                    isNil(globalPrefix) ? '' : globalPrefix
                }`;

            configure.set('app.url', appUrl);
        }
        return configure;
    }
}
