import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/decorators/public-strategy';
import { CreateUserCommand } from './commands/createUser/create-user.command';
import { CreateUserInput } from './graphQL/create-user.input';
import { LoginUserInput } from './graphQL/login-user.input';
import { LoginUserQuery } from './queries/loginUser/login-user.query';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Public()
  @Query(() => String)
  async loginUser(
    @Args('loginUserData') loginUserData: LoginUserInput,
  ): Promise<string> {
    return await this.queryBus.execute<LoginUserQuery, string>(
      new LoginUserQuery(loginUserData.email, loginUserData.password),
    );
  }

  @Public()
  @Mutation(() => Boolean, { name: 'createUser' })
  async createUser(
    @Args('createUserData')
    createUserData: CreateUserInput,
  ) {
    return this.commandBus.execute<CreateUserCommand, boolean>(
      new CreateUserCommand(
        createUserData.name,
        createUserData.email,
        createUserData.password,
      ),
    );
  }
}
