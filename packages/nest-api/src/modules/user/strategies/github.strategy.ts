import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { instanceToPlain } from 'class-transformer';

import { GitHubProfile } from '../types';
import { UserService } from '../services';

/**
 * 用户认证本地策略
 */
@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/github/callback',
            scope: ['user:email'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: GitHubProfile,
        done: (error: null, data: any) => void,
    ) {
        const user = await this.userService.create({
            email: profile.emails[0].value,
            name: profile.displayName,
            provider: 'github',
            activated: true,
        });

        done(null, instanceToPlain(user));
    }
}
