import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pin } from './pin.schema'; 

@Injectable()
export class PinService {
  constructor(@InjectModel('Pin') private pinModel: Model<Pin>) {}

  async createPin(pinData): Promise<Pin> {
    const newPin = new this.pinModel(pinData);
    return newPin.save();
  }

  async getPins(): Promise<Pin[]> {
    return this.pinModel.find({});
  }

  async likePin(pinId: string, userId: string): Promise<Pin> {
    return this.pinModel
      .findByIdAndUpdate(
        pinId,
        { $addToSet: { likes: userId } },
        { new: true }
      )
      .exec();
  }
}
