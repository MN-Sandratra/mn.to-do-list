import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { GqlUser } from 'src/decorators/gqlUser.decorator';
import { CreateTaskCommand } from './commands/createTask/create-task.command';
import { DeleteTaskCommand } from './commands/deleteTask/deleteTask.command';
import { CreateTaskInput } from './graphQL/create-task.input';
import { TaskOutput } from './graphQL/task.output';
import { GetAllCompletedTasksQuery } from './queries/getAllCompletedTasks/get-all-completed-tasks.query';
import { GetAllTasksQuery } from './queries/getAllTasks/get-all-tasks.query';
import { GetAllTasksByCategoryQuery } from './queries/getAllTasksByCategory/get-all-task-by-category.query';
import { GetTasksForTodayQuery } from './queries/getTasksForToday/get-tasks-for-today.query';

@Resolver('task')
export class TaskResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => [TaskOutput])
  async getAllTasks(@GqlUser() user): Promise<TaskOutput[]> {
    return this.queryBus.execute(new GetAllTasksQuery(user.id));
  }

  @Query(() => [TaskOutput])
  async getAllCompletedTasks(@GqlUser() user) {
    return this.queryBus.execute(new GetAllCompletedTasksQuery(user.id));
  }

  @Query(() => [TaskOutput])
  async getTasksForToday(@GqlUser() user) {
    return this.queryBus.execute(new GetTasksForTodayQuery(user.id));
  }

  @Query(() => [TaskOutput])
  async getAllTasksByCategory(
    @GqlUser() user,
    @Args('categoryId') categoryId: string,
  ) {
    return this.queryBus.execute(
      new GetAllTasksByCategoryQuery(user.id, categoryId),
    );
  }

  @Mutation()
  async createTask(
    @GqlUser() user,
    @Args('TaskData') taskInput: CreateTaskInput,
  ) {
    const { name, category, date } = taskInput;
    return this.commandBus.execute(
      new CreateTaskCommand(user.id, new Types.ObjectId(category), name, date),
    );
  }

  @Mutation(() => Boolean)
  async deleteTask(@Args('taskId') taskId: string, @GqlUser() user) {
    return this.commandBus.execute(
      new DeleteTaskCommand(new Types.ObjectId(taskId), user.id),
    );
  }
}
