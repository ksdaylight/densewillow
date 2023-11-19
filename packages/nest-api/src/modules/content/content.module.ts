import { ModuleMetadata } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ModuleBuilder } from '../core/decorators';

import { MediaModule } from '../media/media.modules';

import { UserModule } from '../user/user.module';

import * as services from './services';

import * as controllers from './controllers';
import { ContentRbac } from './rbac';

@ModuleBuilder(async (configure) => {
    const providers: ModuleMetadata['providers'] = [...Object.values(services), ContentRbac];

    return {
        imports: [MediaModule, UserModule, HttpModule],
        providers,
        postService: Object.values(controllers),
        exports: [...Object.values(services)],
    };
})
export class ContentModule {}
