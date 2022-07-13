import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Request } from 'express';
import { RequestExt } from 'src/types/request.type';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAvailableUsers(@Req() request: RequestExt) {
        return this.userService.findAvailableUsers(request.user);
    }
}
