import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('IconInput')
export class Icon {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  symbol: string;
}
