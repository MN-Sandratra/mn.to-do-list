import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from 'src/categorie/schemas/categorie.schema';
import { Task, TaskDocument } from 'src/task/schema/task.schema';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { GetAllTasksByCategoryQuery } from './get-all-task-by-category.query';

@QueryHandler(GetAllTasksByCategoryQuery)
export class GetAllTasksByCategoryHandler
  implements IQueryHandler<GetAllTasksByCategoryQuery, Task[]>
{
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async execute(query: GetAllTasksByCategoryQuery): Promise<Task[]> {
    const { userId, categoryId } = query;

    const currentUser = await this.userModel.findById(userId);

    if (!currentUser) {
      throw new NotFoundException(
        `user with id ${userId} not found - in GetAllTasksByCategoryHandler`,
      );
    }

    const currentCategory = await this.categoryModel.findById(categoryId);

    if (!currentCategory) {
      throw new NotFoundException(
        `category with id ${categoryId} not found - in GetAllTasksByCategoryHandler`,
      );
    }

    return await this.taskModel.find({ user: userId, category: categoryId });
  }
}
