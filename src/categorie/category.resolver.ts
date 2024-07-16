import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlUser } from 'src/decorators/gqlUser.decorator';
import { CreateCategoryCommand } from './commands/createCategory/create-category.command';
import { UpdateCategoryCommand } from './commands/updateCategory/update-category.command';
import { CategoryOutput } from './graphQL/category.output';
import { CreateCategoryInput } from './graphQL/create-category.input';
import { UpdateCategoryInput } from './graphQL/update-category.input';
import { GetAllCategoriesQuery } from './queries/getAllCategories/get-all-categories.query';
import { GetCategoryByIdQuery } from './queries/getCategoryById/get-category-by-id.query';

@Resolver('Category')
export class CategoryResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => CategoryOutput)
  async createCategory(
    @Args('createCategoryData')
    createCategoryInput: CreateCategoryInput,
    @GqlUser() user,
  ): Promise<CategoryOutput> {
    const { name, color, icon } = createCategoryInput;

    return this.commandBus.execute(
      new CreateCategoryCommand(name, color, icon, user.id),
    );
  }

  @Mutation(() => Boolean)
  async updateCategory(
    @Args('categoryId')
    categoryId: string,
    @Args('updateCategoryData')
    updateCategoryInput: UpdateCategoryInput,
  ) {
    const { name, isEditable, color, icon } = updateCategoryInput;

    return this.commandBus.execute(
      new UpdateCategoryCommand(categoryId, name, color, icon, isEditable),
    );
  }

  @Query(() => [CategoryOutput])
  async getAllCategories(@GqlUser() user): Promise<CategoryOutput[]> {
    return this.queryBus.execute(new GetAllCategoriesQuery(user.id));
  }

  @Query(() => CategoryOutput)
  async getCategoryById(
    @Args('categoryId')
    categoryId: string,
    @GqlUser() user,
  ): Promise<CategoryOutput[]> {
    return this.queryBus.execute(new GetCategoryByIdQuery(categoryId, user.id));
  }
}
