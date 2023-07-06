import { Global, Module, ModuleMetadata, Type } from '@nestjs/common';

import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';

import { isNil, omit } from 'lodash';

import chalk from 'chalk';

import { App } from '../app';
import { Configure } from '../configure';
import { MODULE_BUILDER_REGISTER } from '../constants';
import { CoreModule } from '../core.module';

import { AppFilter } from '../providers';
import {
    AppConfig,
    AppParams,
    CreateOptions,
    Creator,
    CreatorData,
    ModuleBuilderMeta,
    ModuleBuildMap,
    ModuleItem,
    ModuleOption,
} from '../types';

import { CreateModule, isAsyncFn, mergeMeta } from './utils';
/**
 * 输出API和DOC地址
 * @param restful
 */
export async function echoApi(configure: Configure) {
    const appUrl = await configure.get<string>('app.url');
    // const apiUrl = await configure.get<string>('app.api');
    console.log(`- ApiUrl: ${chalk.green.underline(appUrl)}`);
}

/**
 * 创建应用的快捷函数
 * @param options
 */
export function createApp(options: CreateOptions): Creator {
    return async () => App.create(options);
}

/**
 * 构建APP CLI,默认start命令应用启动监听app
 * @param creator APP构建器
 */
export async function bootApp(
    creator: () => Promise<CreatorData>,
    listened?: (params: CreatorData) => () => Promise<void>,
) {
    const { app, configure } = await creator();
    const { port, host } = await configure.get<AppConfig>('app');
    await app.listen(port, host, listened({ configure } as any));
}

/**
 * 构建一个启动模块
 * @param params
 * @param options
 */
export async function createBootModule(
    params: AppParams,
    options: Pick<Partial<CreateOptions>, 'meta' | 'modules' | 'globals'>,
): Promise<{ BootModule: Type<any>; modules: ModuleBuildMap }> {
    const { meta: bootMeta, modules, globals = {} } = options;
    const { configure } = params;
    const importModules = [...modules, CoreModule];
    const moduleMaps = await createImportModules(configure, importModules);
    const imports: ModuleMetadata['imports'] = Object.values(moduleMaps).map((m) => m.module);
    const providers: ModuleMetadata['providers'] = [];
    if (globals.pipe !== null) {
        const pipe = globals.pipe ?? globals.pipe(params);
        providers.push({
            provide: APP_PIPE,
            useValue: pipe,
        });
    }
    if (globals.interceptor !== null) {
        providers.push({
            provide: APP_INTERCEPTOR,
            useClass: globals.interceptor,
        });
    }
    if (globals.filter !== null) {
        providers.push({
            provide: APP_FILTER,
            useClass: AppFilter,
        });
    }

    return {
        BootModule: CreateModule('BootModule', () => {
            let meta: ModuleMetadata = {
                imports,
                providers,
            };
            if (bootMeta) {
                meta = mergeMeta(meta, bootMeta(params));
            }
            return meta;
        }),
        modules: moduleMaps,
    };
}

/**
 * 根据模块类生成导入到启动模块的模块列表
 * @param configure 配置实例
 * @param modules 模块类列表
 */
async function createImportModules(
    configure: Configure,
    modules: ModuleItem[],
): Promise<ModuleBuildMap> {
    const maps: ModuleBuildMap = {};
    for (const m of modules) {
        const option: ModuleOption = 'module' in m ? m : { module: m };
        const metadata: ModuleBuilderMeta = await getModuleMeta(configure, option);
        Module(omit(metadata, ['global']))(option.module);
        if (metadata.global) Global()(option.module);
        maps[option.module.name] = { module: option.module, meta: metadata };
    }
    return maps;
}

/**
 * 根据模块构建装饰器生成medadata
 * @param configure
 * @param option
 */
async function getModuleMeta(configure: Configure, option: ModuleOption) {
    let metadata: ModuleBuilderMeta = {};
    const register = Reflect.getMetadata(MODULE_BUILDER_REGISTER, option.module);
    const params = option.params ?? {};
    if (!isNil(register)) {
        metadata = isAsyncFn(register)
            ? await register(configure, params)
            : register(configure, params);
    }
    return metadata;
}
