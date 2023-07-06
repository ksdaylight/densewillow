import { MODULE_BUILDER_REGISTER } from '../constants';
import { ModuleMetaRegister } from '../types';

/**
 * 模块构建器
 * @param register Metadata注册函数
 */
export function ModuleBuilder<P extends Record<string, any>>(register: ModuleMetaRegister<P>) {
    return <M extends new (...args: any[]) => any>(target: M) => {
        Reflect.defineMetadata(MODULE_BUILDER_REGISTER, register, target);
        return target;
    };
}
