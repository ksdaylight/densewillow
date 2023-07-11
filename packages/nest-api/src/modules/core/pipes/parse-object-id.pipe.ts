import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string, string> {
    transform(value: string, metadata: ArgumentMetadata): string {
        const isValidObjectId = /^[a-f\d]{24}$/i.test(value);
        if (!isValidObjectId) {
            throw new BadRequestException('Invalid ObjectId');
        }
        return value;
    }
}
