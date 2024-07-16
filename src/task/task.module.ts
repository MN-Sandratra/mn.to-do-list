import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetAllCategoryHandler } from 'src/categorie/queries/getAllCategories/get-all-categories.handler';
import {
  CategorieSchema,
  Category,
} from 'src/categorie/schemas/categorie.schema';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { GetAllCompletedTasksHandlers } from './queries/getAllCompletedTasks/get-all-completed-tasks..handler';
import { GetAllTasksHandler } from './queries/getAllTasks/get-all-tasks.handler';
import { Task, TaskSchema } from './schema/task.schema';

const commandHandlers = [];
const queryHandlers = [
  GetAllCategoryHandler,
  GetAllCompletedTasksHandlers,
  GetAllTasksHandler,
];
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: User.name, schema: UserSchema },
      { name: Category.name, schema: CategorieSchema },
    ]),
  ],
  providers: [...queryHandlers, ...commandHandlers],
})
export class TaskModule {}
