import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { LoginUserQuery } from './login-user.query';

@QueryHandler(LoginUserQuery)
export class LoginUserHandler implements IQueryHandler<LoginUserQuery, string> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly userService: UserService,
  ) {}

  async execute(query: LoginUserQuery): Promise<string> {
    const { email, password } = query;

    const existingUser = await this.userModel.findOne({ email });

    if (!existingUser) {
      throw new NotFoundException('User does not exist');
    }

    const isIdenticalPassword = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isIdenticalPassword) {
      throw new NotFoundException('Invalid password');
    }

    return this.userService.getUserToken(existingUser._id);
  }
}
