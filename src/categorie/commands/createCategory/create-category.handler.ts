import { BadRequestException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from 'src/categorie/schemas/categorie.schema';
import { CreateCategoryCommand } from './create-category.command';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler
  implements ICommandHandler<CreateCategoryCommand, Category>
{
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async execute(command: CreateCategoryCommand): Promise<Category> {
    const { name, color, icon, user } = command;

    const existingUser = await this.categoryModel.findOne({ name, user });

    if (existingUser) throw new BadRequestException('Category already exists');

    return this.categoryModel.create({
      name,
      color,
      icon,
      user,
    });
  }
}
