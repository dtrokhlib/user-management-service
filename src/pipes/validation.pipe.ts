import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        const object = plainToInstance(metadata.metatype, value);
        const errors = await validate(object);

        if (errors.length > 0) {
            throw new BadRequestException('Test');
        }
        return value;
    }
}
