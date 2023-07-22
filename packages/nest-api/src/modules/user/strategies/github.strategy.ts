import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';

import { isNil } from 'lodash';

import { GitHubProfile } from '../types';
import { UserService } from '../services';

/**
 * 用户认证本地策略
 */
@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
    constructor(protected readonly userService: UserService) {
        super({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: 'http://192.168.80.6/api/auth/github/callback', // TODO 更改，以及网络情况验证
            scope: ['user:email'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: GitHubProfile,
        done: (error: null, data: any) => void,
    ) {
        // profile.accessToken = accessToken;
        let user = await this.userService.detail({
            email: profile.emails[0].value,
        });
        if (isNil(user)) {
            user = await this.userService.create({
                email: profile.emails[0].value,
                name: profile.displayName,
                provider: 'github',
                activated: true,
            });
        }
        done(null, user);
    }
}
