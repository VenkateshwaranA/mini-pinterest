import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PinController } from './pin.controller';
import { PinService } from './pin.service';
import { PinSchema } from './pin.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Pin', schema: PinSchema }])],
  controllers: [PinController],
  providers: [PinService],
})
export class PinModule {}
