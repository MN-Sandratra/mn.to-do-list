import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from 'src/categorie/schemas/categorie.schema';
import { Task, TaskDocument } from 'src/task/schema/task.schema';
import { DeleteCategoryCommand } from './delete-category.command';

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler
  implements ICommandHandler<DeleteCategoryCommand, boolean>
{
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  async execute(command: DeleteCategoryCommand): Promise<boolean> {
    const { categoryId, userId } = command;

    const currentCategory = await this.categoryModel.findById(categoryId);

    if (!currentCategory)
      throw new NotFoundException(`category with id ${categoryId} not found`);

    await this.taskModel.deleteMany({
      category: categoryId,
    });

    const { deletedCount } = await this.categoryModel.deleteOne({
      _id: categoryId,
      user: userId,
    });

    if (deletedCount == 0)
      throw new Error(
        `Can't delete category with id: ${categoryId}, category was not found - in DeleteCategoryHandler`,
      );
    return true;
  }
}
