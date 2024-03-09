/* eslint-disable func-names */
import { exit } from 'process';

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { isNil } from 'lodash';

import { FastifyInstance } from 'fastify';
import type { FastifyCookieOptions } from '@fastify/cookie';
import cookie from '@fastify/cookie';

import { generateOpenApi } from '@ts-rest/open-api';
import { SwaggerModule } from '@nestjs/swagger';

import { apiBlog } from '@api-contracts';

import { Configure } from './configure';

import { ConfigStorageOption, CreateOptions, CreatorData } from './types';
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
            // add swagger
            const document = generateOpenApi(
                apiBlog,
                {
                    info: {
                        title: 'example swagger',
                        version: '1.0.0',
                    },
                },
                {
                    setOperationId: true,
                    jsonQuery: true,
                },
            );

            SwaggerModule.setup('api-docs', this._app, document);

            // 允许使用关闭监听的钩子
            this._app.enableShutdownHooks();
            if (this._app.getHttpAdapter() instanceof FastifyAdapter) {
                // 启用文件上传服务
                // eslint-disable-next-line global-require
                this._app.register(require('@fastify/multipart'), {
                    attachFieldsToBody: true,
                    // prefix: '/api/',
                });
            }
            // 初始化应用
            if (this._app.getHttpAdapter() instanceof FastifyAdapter) {
                await this._app.init();
            }
            const fastifyInstance = this._app.getHttpAdapter().getInstance();

            (fastifyInstance as FastifyInstance)
                .addHook('onRequest', (request, reply, done) => {
                    (reply as any).setHeader = function (key: any, value: any) {
                        return this.raw.setHeader(key, value);
                    };
                    (reply as any).end = function () {
                        this.raw.end();
                    };
                    (reply as any).res = reply;
                    done();
                }) // for fastify + nestJs passport
                .register(cookie, {
                    secret: 'my-cookie-secret', // for cookies signature /todo
                    parseOptions: {}, // options for parsing cookies
                } as FastifyCookieOptions);
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
        let appUrl = await configure.get('app.url', '');
        if (isNil(appUrl) || appUrl.length <= 0) {
            const host = await configure.get<string>('app.host');
            const port = await configure.get<number>('app.port')!;
            const https = await configure.get<boolean>('app.https');
            // const globalPrefix = await configure.get<string>('app.globalPrefix');
            const globalPrefix = 'api';

            appUrl = `${https ? 'https' : 'http'}://${host!}:${port}${
                isNil(globalPrefix) ? '' : `/${globalPrefix}`
            }`;

            configure.set('app.url', appUrl);
        }
        return configure;
    }
}
