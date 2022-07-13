import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        forwardRef(() => UserModule),
        JwtModule.register({
            secret: jwtConstants.secret || 'SECRET',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    exports: [JwtModule],
})
export class AuthModule {}
