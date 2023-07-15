import { ModuleMetadata } from '@nestjs/common';

import { ModuleBuilder } from '../core/decorators';

import * as services from './services';

import * as controllers from './controllers';

@ModuleBuilder(async (configure) => {
    const providers: ModuleMetadata['providers'] = [...Object.values(services)];

    return {
        imports: [],
        providers,
        controllers: Object.values(controllers),
        exports: [...Object.values(services)],
    };
})
export class ContentModule {}
