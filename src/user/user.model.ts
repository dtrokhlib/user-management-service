import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export enum UserRoles {
    user = 'user',
    admin = 'admin',
}

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    email: string;
    @Prop({ required: true })
    password: string;
    @Prop({
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    })
    boss: User;
    @Prop({ required: false, default: UserRoles.user })
    role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);
