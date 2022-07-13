import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
    @IsString()
    @IsEmail()
    readonly email: string;
    @IsString()
    @MinLength(5)
    @MaxLength(25)
    readonly password: string;
}
