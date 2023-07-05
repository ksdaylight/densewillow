/** ******************** 应用创建  ********************* */
/** ******************** 模块构造  ********************* */
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
