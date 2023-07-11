import { ArgumentMetadata, ParseUUIDPipe } from '@nestjs/common';
/**
 * 验证url中的param参数是可选的UUID
 */
export class OptionalUUIDPipe extends ParseUUIDPipe {
    async transform(value?: string, metadata?: ArgumentMetadata) {
        if (value === undefined) return value;
        return super.transform(value, metadata);
    }
}
