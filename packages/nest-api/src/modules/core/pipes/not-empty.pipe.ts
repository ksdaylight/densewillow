import { PipeTransform, Injectable, ArgumentMetadata, ForbiddenException } from '@nestjs/common';
import { isNil } from 'lodash';

interface Options {
    /**
     * 最大长度
     */
    maxLength?: number | undefined;
    /**
     * 最小长度
     */
    minLength?: number | undefined;
}
/**
 * 验证url中的param参数不为空
 */
@Injectable()
export class NotEmptyPipe implements PipeTransform {
    protected maxLength: number | undefined;

    protected minLength: number | undefined;

    constructor(options?: Options) {
        this.maxLength = options?.maxLength;
        this.minLength = options?.minLength;
    }

    transform(value: string, metadata: ArgumentMetadata) {
        if (isNil(value) || !(typeof value === 'string'))
            throw new ForbiddenException('The param is empty or is not a string value!');
        if (this.maxLength && value.length > this.maxLength)
            throw new ForbiddenException(`The param's can not surpass then ${this.maxLength}!`);
        if (this.minLength && value.length < this.minLength)
            throw new ForbiddenException(`The param's can not less then ${this.maxLength}!`);
        return value;
    }
}
