import { ModuleBuilder } from '../core/decorators';

import * as services from './services';

@ModuleBuilder(async (configure) => ({
    imports: [],
    providers: [...Object.values(services)],
    exports: [...Object.values(services)],
}))
export class MediaModule {}
