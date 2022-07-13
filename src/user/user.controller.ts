import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
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

    @Put('/change-boss')
    @UseGuards(JwtAuthGuard)
    changeUserBoss(
        @Body() { userId, newBossId }: any,
        @Req() request: RequestExt
    ) {
        return this.userService.changeUserBoss(
            request.user.id,
            userId,
            newBossId
        );
    }
}
