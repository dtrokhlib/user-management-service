import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`,
        }),
        AuthModule,
        UserModule,
        MongooseModule.forRoot(process.env.MONGO_URL),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
