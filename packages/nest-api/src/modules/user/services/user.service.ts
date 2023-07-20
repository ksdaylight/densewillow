import { ForbiddenException, Injectable, OnModuleInit } from '@nestjs/common';
import { isArray, isNil, omit } from 'lodash';
import { EntityNotFoundError, SelectQueryBuilder, DataSource, In } from 'typeorm';

import { Configure } from '@/modules/core/configure';
import { BaseService } from '@/modules/database/base';
import { QueryHook } from '@/modules/database/types';

import { SystemRoles } from '@/modules/rbac/constants';
import { RoleRepository } from '@/modules/rbac/repositories';

import { UpdatePasswordDto } from '../dtos';
import { CreateUserDto, QueryUserDto, UpdateUserDto } from '../dtos/user.dto';
import { UserEntity } from '../entities/user.entity';
import { decrypt, encrypt, getUserConfig } from '../helpers';
import { UserRepository } from '../repositories/user.repository';
import { UserConfig } from '../types';

/**
 * 用户管理服务
 */
@Injectable()
export class UserService extends BaseService<UserEntity, UserRepository> implements OnModuleInit {
    protected enable_trash = true;

    constructor(
        protected readonly userRepository: UserRepository,
        protected roleRepository: RoleRepository,
        protected configure: Configure,
        protected dataSource: DataSource,
    ) {
        super(userRepository);
    }

    async onModuleInit() {
        // console.log(
        //     `\n ----getUserConfig-------------- ${!(await this.configure.get<boolean>(
        //         'app.server',
        //         true,
        //     ))} ------ ${!this.dataSource.isInitialized} \n`
        // );
        if (
            !(await this.configure.get<boolean>('app.server', true)) ||
            !this.dataSource.isInitialized
        )
            return null;
        const adminConf = await getUserConfig<UserConfig['super']>('super');
        const admin = await this.findOneByCredential(adminConf.username);
        if (!isNil(admin)) {
            if (!admin.isCreator) {
                await UserEntity.save({ id: admin.id, isCreator: true });
                return this.findOneByCredential(adminConf.username);
            }
            return admin;
        }
        return this.create({ ...adminConf, isCreator: true } as any);
    }

    /**
     * 创建用户
     * @param data
     */
    async create({ roles, permissions, ...data }: CreateUserDto) {
        const user = await this.userRepository.save(omit(data, ['isCreator']), { reload: true });
        if (isArray(roles) && roles.length > 0) {
            await this.userRepository
                .createQueryBuilder('user')
                .relation('roles')
                .of(user)
                .add(roles);
        }
        if (isArray(permissions) && permissions.length > 0) {
            await this.userRepository
                .createQueryBuilder('user')
                .relation('permissions')
                .of(user)
                .add(permissions);
        }
        await this.syncActived(await this.detail(user.id));
        return this.detail(user.id);
    }

    /**
     * 根据用户的actived字段同步角色和权限
     * @param user
     */
    protected async syncActived(user: UserEntity) {
        const roleRelation = this.userRepository.createQueryBuilder().relation('roles').of(user);
        const permissionRelation = this.userRepository
            .createQueryBuilder()
            .relation('permissions')
            .of(user);
        if (user.actived) {
            const roleNames = (user.roles ?? []).map(({ name }) => name);
            const noRoles =
                roleNames.length <= 0 ||
                (!roleNames.includes(SystemRoles.USER) && !roleNames.includes(SystemRoles.ADMIN));
            const isSuperAdmin = roleNames.includes(SystemRoles.ADMIN);

            // 为普通用户添加custom-user角色
            // 为超级管理员添加super-admin角色
            if (noRoles) {
                const customRole = await this.roleRepository.findOne({
                    relations: ['users'],
                    where: { name: SystemRoles.USER },
                });
                if (!isNil(customRole)) await roleRelation.add(customRole);
            } else if (isSuperAdmin) {
                const adminRole = await this.roleRepository.findOne({
                    relations: ['users'],
                    where: { name: SystemRoles.ADMIN },
                });
                if (!isNil(adminRole)) await roleRelation.addAndRemove(adminRole, user.roles);
            }
        } else {
            // 清空禁用用户的角色和权限
            await roleRelation.remove((user.roles ?? []).map(({ id }) => id));
            await permissionRelation.remove((user.permissions ?? []).map(({ id }) => id));
        }
    }

    /**
     * 更新用户
     * @param data
     */
    async update({ roles, permissions, ...data }: UpdateUserDto) {
        const user = await this.userRepository.save(omit(data, ['isCreator']), { reload: true });
        const detail = await this.detail(user.id);
        if (isArray(roles) && roles.length > 0) {
            await this.userRepository
                .createQueryBuilder('user')
                .relation('roles')
                .of(detail)
                .addAndRemove(roles, detail.roles ?? []);
        }
        if (isArray(permissions) && permissions.length > 0) {
            await this.userRepository
                .createQueryBuilder('user')
                .relation('permissions')
                .of(user)
                .addAndRemove(permissions, detail.permissions ?? []);
        }
        await this.syncActived(await this.detail(user.id));
        return this.detail(user.id);
    }

    /**
     * 根据用户用户凭证查询用户
     * @param credential
     * @param callback
     */
    async findOneByCredential(credential: string, callback?: QueryHook<UserEntity>) {
        let query = this.userRepository.buildBaseQuery();
        if (callback) {
            query = await callback(query);
        }
        return query
            .where('user.username = :credential', { credential })
            .orWhere('user.email = :credential', { credential })
            .orWhere('user.phone = :credential', { credential })
            .getOne();
    }

    /**
     * 根据对象条件查找用户,不存在则抛出异常
     * @param condition
     * @param callback
     */
    async findOneByCondition(condition: { [key: string]: any }, callback?: QueryHook<UserEntity>) {
        let query = this.userRepository.buildBaseQuery();
        if (callback) {
            query = await callback(query);
        }
        const wheres = Object.fromEntries(
            Object.entries(condition).map(([key, value]) => [key, value]),
        );
        const user = query.where(wheres).getOne();
        if (!user) {
            throw new EntityNotFoundError(UserEntity, Object.keys(condition).join(','));
        }
        return user;
    }

    /**
     * 更新用户密码
     * @param user
     * @param param1
     */
    async updatePassword(user: UserEntity, { password, oldPassword }: UpdatePasswordDto) {
        const item = await this.userRepository.findOneOrFail({
            select: ['password'],
            where: { id: user.id },
        });
        if (decrypt(item.password, oldPassword))
            throw new ForbiddenException('old password not matched');
        item.password = await encrypt(password);
        await this.userRepository.save(item);
        return this.detail(item.id);
    }

    protected async buildListQB(
        queryBuilder: SelectQueryBuilder<UserEntity>,
        options: QueryUserDto,
        callback?: QueryHook<UserEntity>,
    ) {
        const { actived, orderBy } = options;
        const qb = await super.buildListQB(queryBuilder, options, callback);
        if (actived !== undefined && typeof actived === 'boolean') {
            qb.andWhere('actived = :actived', { actived });
        }
        if (!isNil(options.role)) {
            qb.leftJoinAndSelect(`${this.userRepository.qbName}.roles`, 'roles');
            qb.andWhere('roles.id IN (:...roles)', {
                roles: [options.role],
            });
        }
        if (!isNil(options.permission)) {
            qb.andWhere('permissions.id IN (:...permissions)', {
                permissions: [options.permission],
            });
        }
        if (orderBy) qb.orderBy(`user.${orderBy}`, 'ASC');
        return qb;
    }

    /**
     * 获取当前用户
     * @param condition
     * @param callback
     */
    async getCurrentUser(user?: ClassToPlain<UserEntity>): Promise<UserEntity> {
        return this.userRepository.findOneOrFail({ where: { id: user.id } });
    }

    async getCurrentUserWithPermission(user?: ClassToPlain<UserEntity>): Promise<UserEntity> {
        return this.userRepository.findOneOrFail({
            relations: ['roles.permissions', 'permissions'],
            where: { id: user.id },
        });
    }

    async delete(items: string[], trash = true) {
        const users = await this.repository.find({
            where: { id: In(items) },
            withDeleted: true,
        });
        for (const user of users) {
            if (user.isCreator)
                throw new ForbiddenException('Can not delete first super admin user!');
        }

        if (!trash) return this.repository.remove(users);

        const directs = users.filter((item) => !isNil(item.deletedAt));
        const softs = users.filter((item) => isNil(item.deletedAt));

        return [
            ...(await this.repository.remove(directs)),
            ...(await this.repository.softRemove(softs)),
        ];
    }
}
