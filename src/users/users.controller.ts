import { Controller, Param } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { UsersService, IUser } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): IUser[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }
}
