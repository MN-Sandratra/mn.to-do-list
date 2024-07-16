import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/task/schema/task.schema';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { GetAllCompletedTasksQuery } from './get-all-completed-tasks.query';

@QueryHandler(GetAllCompletedTasksQuery)
export class GetAllCompletedTasksHandlers
  implements IQueryHandler<GetAllCompletedTasksQuery, Task[]>
{
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async execute(query: GetAllCompletedTasksQuery): Promise<Task[]> {
    const { userId } = query;

    const currentUser = await this.userModel.findById(userId);

    if (!currentUser) {
      throw new NotFoundException(`user with id ${userId} not found`);
    }

    return await this.taskModel.find({ user: userId, isCompleted: true });
  }
}
