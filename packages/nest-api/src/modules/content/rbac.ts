import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { PermissionAction, SystemRoles } from '../rbac/constants';
import { RbacResolver } from '../rbac/rbac.resolver';

@Injectable()
export class ContentRbac implements OnModuleInit {
    constructor(private moduleRef: ModuleRef) {}

    onModuleInit() {
        const resolver = this.moduleRef.get(RbacResolver, { strict: false });
        resolver.addPermissions([
            {
                name: 'post.create',
                rule: {
                    action: PermissionAction.CREATE,
                    subject: 'Post',
                },
            },
            {
                name: 'post.owner',
                rule: {
                    action: PermissionAction.OWNER,
                    subject: 'Post',
                    conditions: (user) => ({
                        'author.id': user.id,
                    }),
                },
            },
            {
                name: 'comment.create',
                rule: {
                    action: PermissionAction.CREATE,
                    subject: 'Comment',
                },
            },
            {
                name: 'comment.owner',
                rule: {
                    action: PermissionAction.OWNER,
                    subject: 'Comment',
                    conditions: (user) => ({
                        'user.id': user.id,
                    }),
                },
            },
            {
                name: 'post.manage',
                rule: {
                    action: PermissionAction.MANAGE,
                    subject: 'Post',
                },
            },
            {
                name: 'category.manage',
                rule: {
                    action: PermissionAction.MANAGE,
                    subject: 'Category',
                },
            },
            {
                name: 'comment.manage',
                rule: {
                    action: PermissionAction.MANAGE,
                    subject: 'Comment',
                },
            },
        ]);
        resolver.addRoles([
            {
                name: SystemRoles.USER,
                permissions: [
                    'post.read',
                    'post.create',
                    'post.owner',
                    'comment.create',
                    'comment.owner',
                ],
            },
            {
                name: 'content-manage',
                label: '内容管理员',
                description: '管理内容模块',
                permissions: ['post.manage', 'category.manage', 'comment.manage'],
            },
        ]);
    }
}
