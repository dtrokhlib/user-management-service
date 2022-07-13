import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserRoles } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async register(dto: CreateUserDto) {
        const user = await this.userService.create(dto);
        return { token: await this.createToken(user._id, user.role) };
    }

    async login(dto: LoginUserDto) {
        try {
            const userExist = await this.userService.findByEmail(dto.email);
            const isPasswordValid = await bcrypt.compare(
                dto.password,
                userExist.password
            );

            if (!userExist || !isPasswordValid) {
                throw new HttpException(
                    { message: 'Invalid credentials' },
                    HttpStatus.BAD_REQUEST
                );
            }

            return {
                token: await this.createToken(userExist._id, userExist.role),
            };
        } catch (err) {
            throw new HttpException(
                { message: 'Invalid credentials' },
                HttpStatus.BAD_REQUEST
            );
        }
    }

    async createToken(id: string, role: UserRoles) {
        return await this.jwtService.sign({ id, role });
    }
}
