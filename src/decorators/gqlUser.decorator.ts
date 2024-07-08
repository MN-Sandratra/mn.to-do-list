import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GqlUser = createParamDecorator((_, context: ExecutionContext) => {
  const gqlContext = GqlExecutionContext.create(context);
  const req = gqlContext.getContext()?.req;

  return {
    id: req?.user?.userId,
  };
});
