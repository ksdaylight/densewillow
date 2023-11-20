/* eslint-disable jest/expect-expect */
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

import { PostService } from '../src/modules/content/services/post.service';
import * as configs from '../src/config';

import { App } from '../src/modules/core/app';
import { createBootModule } from '../src/modules/core/helpers/app';
import { MediaModule } from '../src/modules/media/media.modules';
import { RbacGuard } from '../src/modules/rbac/guards';
import { RbacModule } from '../src/modules/rbac/rbac.module';
import { UserModule } from '../src/modules/user/user.module';
import { ContentModule } from '../src/modules/content/content.module';

describe('e2e example', () => {
    let app: NestFastifyApplication;
    let postService: PostService;

    beforeEach(async () => {
        const configure = await App.buildConfigure(configs);
        const { BootModule } = await createBootModule(
            { configure },
            {
                modules: [UserModule, RbacModule, MediaModule, ContentModule],
                globals: { guard: RbacGuard },
            },
        );
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [BootModule],
            providers: [
                {
                    provide: PostService,
                    useValue: {
                        posts: jest.fn(),
                    },
                },
            ],
        }).compile();

        postService = moduleRef.get<PostService>(PostService);

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it('should get posts', async () => {
        jest.spyOn(postService, 'posts').mockResolvedValue({
            posts: [],
            total: 0,
        });
        return request(app.getHttpServer())
            .post('/posts')
            .query('skip=0&take=10')
            .expect(200)
            .expect({
                posts: [],
                count: 0,
                skip: 0,
                take: 10,
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
