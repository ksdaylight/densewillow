/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import { Test } from '@nestjs/testing';

import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { omit } from 'lodash';

import { PrismaService } from '../../core/providers/prisma.service';

import { Configure } from '../../core/configure';

import { UserService } from '../../user/services';

import { PostService } from '.';

const mockData = {
    test: 'nestjs',
};
const moduleMocker = new ModuleMocker(global);

describe('PostService', () => {
    let postService: PostService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [PostService],
        })
            .useMocker((token) => {
                if (token === PrismaService) {
                    return {
                        post: {
                            findUniqueOrThrow: jest.fn(async (args) => ({
                                id: 'nest',
                                ...args,
                                ...mockData,
                            })),
                            findUnique: jest.fn(async (args) => ({
                                id: 'nest',
                                ...args,
                                ...mockData,
                            })),
                            findMany: jest.fn(async (dto) => [mockData]),
                            count: jest.fn(async (id) => mockData),
                            create: jest.fn(async (data) => mockData),
                            update: jest.fn(async (args) => mockData),
                            delete: jest.fn(async (Args) => mockData),
                        },
                    };
                }
                if (token === Configure) {
                    return {};
                }
                if (token === UserService) {
                    return {
                        getAuthorInfo: jest.fn(async (id) => ({ id, ...omit(mockData, ['id']) })),
                    };
                }
                if (typeof token === 'function') {
                    const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<
                        any,
                        any
                    >;
                    const Mock = moduleMocker.generateFromMetadata(mockMetadata);
                    return new Mock();
                }
            })
            .compile();

        postService = moduleRef.get<PostService>(PostService);
    });

    it('should return a post', async () => {
        expect(await postService.post({ slug: 'test' })).toEqual({
            id: 'nest',
            where: { slug: 'test' },
            include: undefined,
            ...omit(mockData),
        });
    });
    // todo..
});
