import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { CategoryResolver } from './category.resolver';
import { CreateCategoryHandler } from './commands/createCategory/create-category.handler';
import { UpdateCategoryHandler } from './commands/updateCategory/update-category.handler';
import { GetAllCategoryHandler } from './queries/getAllCategories/get-all-categories.handler';
import { GetCategoryByIdHandler } from './queries/getCategoryById/get-category-by-id.handler';
import { CategorieSchema, Category } from './schemas/categorie.schema';

const commandHandlers = [CreateCategoryHandler, UpdateCategoryHandler];
const queryHandlers = [GetAllCategoryHandler, GetCategoryByIdHandler];

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorieSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [CategoryResolver, ...commandHandlers, ...queryHandlers],
})
export class CategorieModule {}
