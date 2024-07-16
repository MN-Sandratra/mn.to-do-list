import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('ColorInput')
export class Color {
  @Field(() => String)
  name: string;

  @Field(() => String)
  code: string;

  @Field(() => String, { nullable: true })
  id?: string;
}
