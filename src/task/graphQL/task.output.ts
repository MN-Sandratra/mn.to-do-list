import { Field, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@ObjectType()
export class TaskOutput {
  @Field()
  _id: Types.ObjectId;

  @Field()
  category: Types.ObjectId;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  isCompleted: boolean;

  @Field(() => String)
  date: string;

  @Field()
  user: Types.ObjectId;
}
