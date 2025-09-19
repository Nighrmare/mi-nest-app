import { Injectable, NotFoundException } from '@nestjs/common';

export type IUser = { id: number; name: string; email: string };

@Injectable()
export class UsersService {
  private users: IUser[] = [
    { id: 1, name: 'Maria', email: 'maria@example.com' },
    { id: 2, name: 'juana', email: 'juana@example.com' },
  ];

  findAll(): IUser[] {
    return this.users;
  }

  findOne(id: number): IUser {
    const userfind = this.users.find((user) => user.id === id);
    if (!userfind) throw new NotFoundException('Usuario no encontrado');
    return userfind;
  }
}
