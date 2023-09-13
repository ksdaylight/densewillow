import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RevalidateNextService {
    constructor(private readonly httpService: HttpService) {}

    async performValidateRequest(): Promise<AxiosResponse<any>> {
        return lastValueFrom(
            this.httpService.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate`, {
                params: {
                    token: process.env.REVALIDATE_TOKEN, // 在这里添加你的token参数
                },
            }),
        );
    }
}
