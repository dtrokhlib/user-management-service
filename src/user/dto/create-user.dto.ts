import {
    IsEmail,
    IsEnum,
    IsString,
    MaxLength,
    MinLength,
    Validate,
} from 'class-validator';
import { IsObjectId } from 'src/validators/isValidObjectId';
import { UserRoles } from '../user.model';

export class CreateUserDto {
    @IsString()
    @IsEmail()
    readonly email: string;
    @IsString()
    @MinLength(5)
    @MaxLength(25)
    readonly password: string;
    boss: string;
    @IsEnum(UserRoles, {
        message: `role must be a valid enum value: ${Object.values(UserRoles)}`,
    })
    readonly role: UserRoles;
}
