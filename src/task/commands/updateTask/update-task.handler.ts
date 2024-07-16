import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/task/schema/task.schema';
import { UpdateTaskCommand } from './update-task.command';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler
  implements ICommandHandler<UpdateTaskCommand, Task>
{
  constructor(
    @InjectModel(Task.name)
    public readonly taskModel: Model<TaskDocument>,
  ) {}
  execute(command: UpdateTaskCommand): Promise<Task> {
    const { taskId, name, category, date } = command;

    const updateData: Partial<Task> = {};
    if (name !== undefined) updateData.name = name;
    if (category !== undefined) updateData.category = category;
    if (date !== undefined) updateData.date = date;

    return this.taskModel
      .findByIdAndUpdate(taskId, updateData, { new: true })
      .exec();
  }
}
