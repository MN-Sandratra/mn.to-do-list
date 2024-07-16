import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/task/schema/task.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { CategoryResolver } from './category.resolver';
import { CreateCategoryHandler } from './commands/createCategory/create-category.handler';
import { DeleteCategoryHandler } from './commands/deleteCategory/delete-category.handler';
import { UpdateCategoryHandler } from './commands/updateCategory/update-category.handler';
import { GetAllCategoryHandler } from './queries/getAllCategories/get-all-categories.handler';
import { GetCategoryByIdHandler } from './queries/getCategoryById/get-category-by-id.handler';
import { CategorieSchema, Category } from './schemas/categorie.schema';

const commandHandlers = [
  CreateCategoryHandler,
  UpdateCategoryHandler,
  DeleteCategoryHandler,
];
const queryHandlers = [GetAllCategoryHandler, GetCategoryByIdHandler];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorieSchema },
      { name: User.name, schema: UserSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  providers: [CategoryResolver, ...commandHandlers, ...queryHandlers],
})
export class CategorieModule {}
