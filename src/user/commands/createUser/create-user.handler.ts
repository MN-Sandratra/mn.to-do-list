import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand, boolean>
{
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async execute(command: CreateUserCommand): Promise<boolean> {
    const { name, email, password } = command;

    const existingUser = await this.userModel.find({ email });

    if (existingUser.length > 0) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 13);

    const userToCreate = {
      name: name,
      email: email,
      password: hashedPassword,
    };

    await this.userModel.create(userToCreate);

    return true;
  }
}
