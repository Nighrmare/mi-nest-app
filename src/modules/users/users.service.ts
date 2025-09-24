import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from 'src/interfaces';

@Injectable()
export class UsersService {
  private users: IUser[] = [
    { id: 1, name: 'Maria', email: 'maria@example.com', password: 'password1' },
    { id: 2, name: 'juana', email: 'juana@example.com', password: 'password2' },
  ];

  findAll(): IUser[] {
    return this.users;
  }

  findOne(id: number): IUser {
    const userfind = this.users.find((user) => user.id === id);
    if (!userfind) throw new NotFoundException('Usuario no encontrado');
    return userfind;
  }

  create(user: Omit<IUser, 'id'>): IUser {
    const newId =
      this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1;

    const newUser: IUser = {
      id: newId,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, newUser: Omit<IUser, 'id'>): IUser {
    const user = this.findOne(id);
    Object.assign(user, newUser);
    return user;
  }

  remove(id: number) {
    const user = this.users.findIndex((user) => user.id === id);
    this.users.splice(user, 1);
    return { delete: true };
  }
}
