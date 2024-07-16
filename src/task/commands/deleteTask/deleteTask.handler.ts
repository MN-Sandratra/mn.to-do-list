import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from 'src/task/schema/task.schema';
import { DeleteTaskCommand } from './deleteTask.command';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler
  implements ICommandHandler<DeleteTaskCommand, boolean>
{
  constructor(
    @InjectModel(Task.name)
    public readonly tadkModel: Model<TaskDocument>,
  ) {}

  async execute(command: DeleteTaskCommand): Promise<boolean> {
    const { userId, taskId } = command;

    const { deletedCount } = await this.tadkModel.deleteOne({
      _id: taskId,
      user: userId,
    });

    if (deletedCount == 0)
      throw new Error(
        `Can't delete category with id: ${taskId}, category was not found - in DeleteCategoryHandler`,
      );
    return true;
  }
}
