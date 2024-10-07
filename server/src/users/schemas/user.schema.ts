import * as bcrypt from 'bcrypt';
import { Schema, Document } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
  following: string[];
  followers: string[];
  isFollow: boolean;
}

export const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  isFollow: { type: Boolean, default: false },
});


UserSchema.pre<User>('save', async function (next) {
  const user = this;


  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});
