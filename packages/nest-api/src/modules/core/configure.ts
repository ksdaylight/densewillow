import fs, { readFileSync, writeFileSync } from 'fs';
import path from 'path';

import dotenv from 'dotenv';
import findUp from 'find-up';
import { ensureFileSync } from 'fs-extra';
import { get, has, isFunction, isNil, omit, set } from 'lodash';
import YAML from 'yaml';

import { EnvironmentType } from './constants';
import { deepMerge, isAsyncFn } from './helpers';
import { ConfigStorageOption, ConfigureFactory, ConfigureRegister } from './types';

/**
 * 配置类
 */
export class Configure {
    protected initiated = false;

    protected factories: Record<string, ConfigureFactory<Record<string, any>>> = {};

    protected config: Record<string, any> = {};

    protected ymlConfig: Record<string, any> = {};

    protected enableDynamicStorage = false;

    /**
     * yaml配置路径
     */
    protected yamlPath = path.resolve(__dirname, '../../../../..', 'config.yml');

    constructor() {
        this.setRunEnv();
        this.loadEnvs();
    }

    /**
     * 根据选项初始化配置类
     * @param option
     */
    init(option: ConfigStorageOption = {}) {
        if (this.initiated) return this;
        const { enableDynamicStorage, yamlPath } = option;
        if (!isNil(enableDynamicStorage)) this.enableDynamicStorage = enableDynamicStorage;
        if (!isNil(yamlPath)) this.yamlPath = yamlPath;
        if (this.enableDynamicStorage) this.enabledStorage();
        this.initiated = true;
        return this;
    }

    /**
     * 获取当前允许环境
     */
    getRunEnv(): EnvironmentType {
        return process.env.NODE_ENV as EnvironmentType;
    }

    /**
     * 获取所有配置
     */
    all() {
        return this.config;
    }

    /**
     * 判断配置是否存在
     * @param key
     */
    has(key: string) {
        return has(this.config, key);
    }

    /**
     * 获取配置值
     * @param key
     * @param defaultValue 不存在时返回的默认配置
     */
    async get<T>(key: string, defaultValue?: T): Promise<T> {
        if (!has(this.config, key) && defaultValue === undefined && has(this.factories, key)) {
            await this.syncFactory(key);
            return this.get(key, defaultValue);
        }
        return get(this.config, key, defaultValue) as T;
    }

    /**
     * 设置配置项
     * @param key 配置名
     * @param value 配置值
     * @param storage 是否动态存储
     * @param append 如果为true,则如果已经存在的包含数组的配置,使用追加方式合并,否则直接替换
     */
    set<T>(key: string, value: T, storage = false, append = false) {
        if (storage && this.enableDynamicStorage) {
            ensureFileSync(this.yamlPath);
            set(this.ymlConfig, key, value);
            writeFileSync(this.yamlPath, JSON.stringify(this.ymlConfig, null, 4));
            this.config = deepMerge(this.config, this.ymlConfig, append ? 'merge' : 'replace');
        } else {
            set(this.config, key, value);
        }
        return this;
    }

    /**
     * 添加一个新配置集
     * @param key
     * @param register 配置构造器
     */
    add<T extends Record<string, any>>(
        key: string,
        register: ConfigureRegister<T> | ConfigureFactory<T>,
    ) {
        if (!isFunction(register) && 'register' in register) {
            this.factories[key] = register as any;
        } else if (isFunction(register)) {
            this.factories[key] = { register };
        }
        return this;
    }

    /**
     * 删除配置项
     * @param key
     */
    remove(key: string) {
        if (has(this.ymlConfig, key) && this.enableDynamicStorage) {
            this.ymlConfig = omit(this.ymlConfig, [key]);
            if (has(this.config, key)) omit(this.config, [key]);
            writeFileSync(this.yamlPath, JSON.stringify(this.ymlConfig, null, 4));
            this.config = deepMerge(this.config, this.ymlConfig, 'replace');
        } else if (has(this.config, key)) {
            this.config = omit(this.config, [key]);
        }
        return this;
    }

    /**
     * 手动存储一个配置
     * @param key
     */
    store(key: string) {
        if (!this.enableDynamicStorage) throw new Error('Must enable storage at first!');
        ensureFileSync(this.yamlPath);
        set(this.ymlConfig, key, this.get(key, null));
        writeFileSync(this.yamlPath, JSON.stringify(this.ymlConfig, null, 4));
        this.config = deepMerge(this.config, this.ymlConfig, 'replace');
        return this;
    }

    /**
     * 同步配置
     * 添加一个配置构造器后需用使用此方法同步到配置中
     */
    async sync(name?: string) {
        if (!isNil(name)) await this.syncFactory(name);
        else {
            for (const key in this.factories) {
                await this.syncFactory(key);
            }
        }
    }

    /**
     * 获取全部环境变量
     */
    env(): { [key: string]: string };

    /**
     * 直接获取环境变量
     * @param key
     */
    env<T extends BaseType = string>(key: string): T;

    /**
     * 获取类型转义后的环境变量
     * @param key
     * @param parseTo 类型转义函数
     */
    env<T extends BaseType = string>(key: string, parseTo: ParseType<T>): T;

    /**
     * 获取环境变量,不存在则获取默认值
     * @param key
     * @param defaultValue 默认值
     */
    env<T extends BaseType = string>(key: string, defaultValue: T): T;

    /**
     * 获取类型转义后的环境变量,不存在则获取默认值
     * @param key
     * @param parseTo 类型转义函数
     * @param defaultValue 默认值
     */
    env<T extends BaseType = string>(key: string, parseTo: ParseType<T>, defaultValue: T): T;

    /**
     * 获取环境变量
     * @param key
     * @param parseTo 类型转义函数
     * @param defaultValue 默认值
     */
    env<T extends BaseType = string>(key?: string, parseTo?: ParseType<T> | T, defaultValue?: T) {
        if (!key) return process.env;
        const value = process.env[key];
        if (value !== undefined) {
            if (parseTo && isFunction(parseTo)) {
                return parseTo(value);
            }
            return value as T;
        }
        if (parseTo === undefined && defaultValue === undefined) {
            return undefined;
        }
        if (parseTo && defaultValue === undefined) {
            return isFunction(parseTo) ? undefined : parseTo;
        }
        return defaultValue! as T;
    }

    /**
     * 启用动态配置
     */
    protected enabledStorage() {
        this.enableDynamicStorage = true;

        ensureFileSync(this.yamlPath);
        const ymlConfig = YAML.parse(readFileSync(this.yamlPath, 'utf8'));
        this.ymlConfig = isNil(ymlConfig) ? {} : ymlConfig;
        this.config = deepMerge(this.config, this.ymlConfig, 'replace');
    }

    /**
     * 设置运行环境
     */
    protected setRunEnv() {
        if (
            isNil(process.env.NODE_ENV) ||
            !Object.values(EnvironmentType).includes(process.env.NODE_ENV as EnvironmentType)
        ) {
            process.env.NODE_ENV = EnvironmentType.PRODUCTION;
        }
    }

    /**
     * 加载环境变量文件并合并到process.env中
     */
    protected loadEnvs() {
        if (!process.env.NODE_ENV) {
            process.env.NODE_ENV = EnvironmentType.PRODUCTION;
        }
        const search = [findUp.sync(['.env'])];
        if (process.env.NODE_ENV !== EnvironmentType.PRODUCTION) {
            search.push(findUp.sync([`.env.${process.env.NODE_ENV}`]));
        }
        const envFiles = search.filter((file) => file !== undefined) as string[];
        const fileEnvs = envFiles
            .map((filePath) => dotenv.parse(fs.readFileSync(filePath)))
            .reduce(
                (oc, nc) => ({
                    ...oc,
                    ...nc,
                }),
                {},
            );
        const envs = { ...process.env, ...fileEnvs };
        const keys = Object.keys(envs).filter((key) => !(key in process.env));
        keys.forEach((key) => {
            process.env[key] = envs[key];
        });
    }

    /**
     * 同步配置构造器
     * @param key
     */
    protected async syncFactory(key: string) {
        if (has(this.config, key)) return this;
        const { register, defaultRegister, enableDynamicStorage, hook, append } =
            this.factories[key];
        let defaultValue = {};
        let value = isAsyncFn(register) ? await register(this) : register(this);
        if (!isNil(defaultRegister)) {
            defaultValue = isAsyncFn(defaultRegister)
                ? await defaultRegister(this)
                : defaultRegister(this);
            value = deepMerge(defaultValue, value, 'replace');
        }
        if (!isNil(hook)) {
            value = isAsyncFn(hook) ? await hook(this, value) : hook(this, value);
        }
        this.set(key, value, enableDynamicStorage && isNil(await this.get(key, null)), append);
        return this;
    }
}
