import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() { username, password }: { username: string, password: string }) {
    return this.userService.register(username, password);
  }


  @Post('login')
  async login(@Body() { username, password }: { username: string, password: string }) {
    return this.userService.login(username, password);
  }

  
  @Post('follow')
  async followUser(@Body() { followerId, userId }: { followerId: string, userId: string }) {
    return this.userService.followUser(followerId, userId, true);
  }


  @Post('unfollow')
  async unfollowUser(@Body() { followerId, userId }: { followerId: string, userId: string }) {
    return this.userService.followUser(followerId, userId, false);
  }


  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }
}
