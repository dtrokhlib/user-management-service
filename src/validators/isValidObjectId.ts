import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { isValidObjectId } from 'mongoose';

@ValidatorConstraint({ name: 'ObjectId', async: false })
export class IsObjectId implements ValidatorConstraintInterface {
    validate(
        value: string,
        args?: ValidationArguments
    ): boolean | Promise<boolean> {
        return isValidObjectId(value);
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return 'Object ID is not valid';
    }
}
