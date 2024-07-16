import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from 'src/categorie/schemas/categorie.schema';
import { UpdateCategoryCommand } from './update-category.command';

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler
  implements ICommandHandler<UpdateCategoryCommand, Category>
{
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async execute(command: UpdateCategoryCommand): Promise<Category> {
    const { id, name, isEditable, color, icon } = command;

    const updateData: Partial<Category> = {};
    if (name !== undefined) updateData.name = name;
    if (isEditable !== undefined) updateData.isEditable = isEditable;
    if (color !== undefined) updateData.color = color;
    if (icon !== undefined) updateData.icon = icon;

    return this.categoryModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }
}
