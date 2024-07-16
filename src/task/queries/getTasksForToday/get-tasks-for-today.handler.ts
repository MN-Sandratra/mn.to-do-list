import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/task/schema/task.schema';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { GetTasksForTodayQuery } from './get-tasks-for-today.query';

@QueryHandler(GetTasksForTodayQuery)
export class GetTasksForTodayHandler
  implements IQueryHandler<GetTasksForTodayQuery, Task[]>
{
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async execute(query: GetTasksForTodayQuery): Promise<Task[]> {
    const { userId } = query;
    const todaysISODate = new Date();
    todaysISODate.setHours(0, 0, 0, 0);

    const currentUser = await this.userModel.findById(userId);

    if (!currentUser) {
      throw new NotFoundException(`user with id ${userId} not found`);
    }

    return await this.taskModel.find({
      user: userId,
      date: todaysISODate.toISOString(),
    });
  }
}
