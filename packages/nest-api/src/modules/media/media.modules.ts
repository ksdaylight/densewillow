import { ModuleBuilder } from '../core/decorators';

import * as services from './services';
import * as controllers from './controllers';

@ModuleBuilder(async (configure) => ({
    imports: [],
    providers: [...Object.values(services)],
    controllers: Object.values(controllers),
    exports: [...Object.values(services)],
}))
export class MediaModule {}
