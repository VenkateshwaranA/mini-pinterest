import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PinService } from './pin.service';

@Controller('pins')
export class PinController {
  constructor(private readonly pinService: PinService) {}

  @Post()
  async createPin(@Body() createPinDto) {
    return this.pinService.createPin(createPinDto);
  }

  @Get()
  async getPins() {
    return this.pinService.getPins();
  }

  @Post(':id/like')
  async likePin(@Param('id') pinId: string,
   @Body() 
  body) {
    return this.pinService.likePin(pinId, body.userId);
  }
}
