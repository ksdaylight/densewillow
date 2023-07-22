import { ModuleMetadata } from '@nestjs/common';

import { ModuleBuilder } from '../core/decorators';

import { MediaModule } from '../media/media.modules';

import * as services from './services';

import * as controllers from './controllers';
import { ContentRbac } from './rbac';

@ModuleBuilder(async (configure) => {
    const providers: ModuleMetadata['providers'] = [...Object.values(services), ContentRbac];

    return {
        imports: [MediaModule],
        providers,
        controllers: Object.values(controllers),
        exports: [...Object.values(services)],
    };
})
export class ContentModule {}
