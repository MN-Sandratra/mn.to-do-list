import { ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/task/schema/task.schema';
import { CreateTaskCommand } from './create-task.command';

export class CreateTaskHandler
  implements ICommandHandler<CreateTaskCommand, boolean>
{
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async execute(command: CreateTaskCommand): Promise<any> {
    const { category, date, name, user } = command;

    await this.taskModel.create({ user, category, name, date });

    return true;
  }
}
