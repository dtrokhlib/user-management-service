import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.model';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';


@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        forwardRef(() => AuthModule),
    ],
    exports: [UserService],
})
export class UserModule {}
