import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Patch,
    SerializeOptions,
} from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { isNil, pick } from 'lodash';

import { Configure } from '@/modules/core/configure';
import { OptionalUUIDPipe } from '@/modules/core/pipes';

import { Depends } from '@/modules/restful/decorators';

import { Guest, ReqUser } from '../decorators';

import { UpdateAccountDto, UpdatePasswordDto } from '../dtos';
import { UserEntity } from '../entities';
import { AuthService, UserService } from '../services';
import { UserModule } from '../user.module';

/**
 * 账户中心控制器
 */

@ApiTags('账户操作')
@ApiBearerAuth()
@Depends(UserModule)
@Controller('account')
export class AccountController {
    constructor(
        protected readonly userService: UserService,
        protected readonly authService: AuthService,

        protected configure: Configure,
    ) {}

    /**
     * 获取用户个人信息
     * @param user
     */
    @Get('profile/:item?')
    @ApiOperation({ summary: '查询账户信息(只有用户自己才能查询)' })
    @Guest()
    @SerializeOptions({
        groups: ['user-detail'],
    })
    async profile(
        @ReqUser() user: ClassToPlain<UserEntity>,
        @Param('item', new OptionalUUIDPipe()) item?: string,
    ) {
        if (isNil(item) && isNil(user)) throw new NotFoundException();
        return this.userService.detail(item ?? user.id);
    }

    /**
     * 更新账户信息
     * @param user
     * @param data
     */
    @ApiOperation({ summary: '修改账户信息' })
    @Patch()
    @SerializeOptions({
        groups: ['user-detail'],
    })
    async update(
        @ReqUser() user: ClassToPlain<UserEntity>,
        @Body()
        data: UpdateAccountDto,
    ) {
        return this.userService.update({ id: user.id, ...pick(data, ['username', 'nickname']) });
    }

    /**
     * 更改密码
     * @param user
     * @param data
     */
    @Patch('reset-passowrd')
    @ApiOperation({ summary: '重置密码' })
    @SerializeOptions({
        groups: ['user-detail'],
    })
    async resetPassword(
        @ReqUser() user: ClassToPlain<UserEntity>,
        @Body() data: UpdatePasswordDto,
    ): Promise<UserEntity> {
        return this.userService.updatePassword(user, data);
    }
}
