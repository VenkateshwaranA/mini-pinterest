import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  // Register a new user
  async register(username: string, password: string): Promise<User> {
    const existingUser = await this.userModel.findOne({ username }).exec();
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    console.log('existingUser',existingUser);
    

    const newUser = new this.userModel({ username, password });
    return await newUser.save();
  }

  async login(username: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      'your_secret_key',
      { expiresIn: '1h' },
    );

    return user;
  }

  async followUser(followerId: string, userId: string, isFollow: boolean) {
    const updateData = await this.userModel
      .findByIdAndUpdate(
        followerId,
        isFollow
          ? { $addToSet: { following: userId }, $set: { isFollow: true } }
          : { $pull: { following: userId }, $set: { isFollow: false } },
        { new: true },
      )
      .exec();
    return updateData;
  }

  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
