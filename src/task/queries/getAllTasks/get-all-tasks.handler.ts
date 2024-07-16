import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/task/schema/task.schema';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { GetAllTasksQuery } from './get-all-tasks.query';

@QueryHandler(GetAllTasksQuery)
export class GetAllTasksHandler
  implements IQueryHandler<GetAllTasksQuery, Task[]>
{
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async execute(query: GetAllTasksQuery): Promise<Task[]> {
    const { userId } = query;

    const currentUser = await this.userModel.findById(userId);

    if (!currentUser) {
      throw new NotFoundException(`user with id ${userId} not found`);
    }

    return await this.taskModel.find({ user: userId });
  }
}
