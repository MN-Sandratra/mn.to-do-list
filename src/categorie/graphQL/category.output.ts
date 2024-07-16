// category.schema.ts
import { Field, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { ColorDto } from 'src/types/color.dto';
import { IconDto } from 'src/types/icon.dto';
import { Color } from './color.model';
import { Icon } from './icon.model';

@ObjectType()
export class CategoryOutput {
  @Field(() => String)
  _id: Types.ObjectId;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  isEditable: boolean;

  @Field(() => Color)
  color?: ColorDto;

  @Field(() => Icon)
  icon?: IconDto;

  @Field(() => String)
  user: Types.ObjectId;
}
