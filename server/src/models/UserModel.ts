import mongoose, { Document, Schema } from 'mongoose';
import { PassThrough } from 'stream';

export interface IUser extends Document {
    email: string;
    username: string;
    passwordHash: string;
    role?: "user" | "admin";

    createdAt: string;
    updatedAt: string;

}

const UserSchema = new Schema<IUser>({
    email: { type: String, required: true },
    username: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: false },

}, {
    timestamps: true,
})

export default mongoose.model<IUser>("User", UserSchema);
