import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PinModule } from './pins/pin.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://venkat:venkat@cluster0.vdp9kpr.mongodb.net/pinrest-clone?retryWrites=true&w=majority&appName=Cluster0',
    ),
    PinModule,
    UserModule,
  ],
})
export class AppModule {}
