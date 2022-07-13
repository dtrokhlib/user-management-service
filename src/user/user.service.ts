import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument, UserRoles } from './user.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async create(dto: CreateUserDto) {
        await this.validateUser(dto);
        const hashedPassword = await bcrypt.hash(dto.password, 8);
        if (!dto.boss) {
            delete dto.boss;
        }
        const createdUser = new this.userModel({
            ...dto,
            password: hashedPassword,
        });
        return await createdUser.save();
    }

    private async validateUser(dto: CreateUserDto) {
        const userExist = await this.findByEmail(dto.email);
        const bossIsRequired = this.isBossRequired(dto);

        if (userExist) {
            throw new HttpException(
                { message: 'User with this email already exist' },
                HttpStatus.BAD_REQUEST
            );
        }

        if (bossIsRequired) {
            const bossExist = await this.findById(dto.boss);
            if (!bossExist) {
                throw new HttpException(
                    {
                        message: 'Specified Boss Object Id does not exist',
                    },
                    HttpStatus.BAD_REQUEST
                );
            }
        }
    }

    private isBossRequired(dto: CreateUserDto) {
        return dto.role === UserRoles.user ? true : dto.boss;
    }

    async findByEmail(email: string) {
        return await this.userModel.findOne({ email }).exec();
    }

    async findById(id: string) {
        try {
            return await this.userModel.findById(id).exec();
        } catch (err) {
            throw new HttpException(
                { message: 'Object ID is not valid' },
                HttpStatus.BAD_REQUEST
            );
        }
    }

    async findAvailableUsers(user: { id: string; role: string }) {
        if (user.role === UserRoles.admin) {
            return await this.userModel
                .find({}, { email: 1, _id: 1, boss: 1, role: 1 })
                .exec();
        }

        return await this.recursiveUserQuery(user);
    }

    private async recursiveUserQuery(user) {
        let users = await this.userModel.find(
            { boss: user.id },
            { email: 1, _id: 1, boss: 1, role: 1 }
        );
        let usersList = [...users];
        for (let i = 0; i < usersList.length; i++) {
            let employee = await this.userModel.find(
                { boss: usersList[i].id },
                { email: 1, _id: 1, boss: 1, role: 1 }
            );
            if (employee) {
                usersList = [...usersList, ...employee];
            }
        }
        const requestor = await this.userModel.findById(user.id, {
            email: 1,
            _id: 1,
            boss: 1,
            role: 1,
        });
        return [requestor, ...usersList];
    }
}
