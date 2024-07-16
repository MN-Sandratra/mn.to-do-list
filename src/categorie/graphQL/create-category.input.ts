// dto/create-category.input.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { ColorDto } from 'src/types/color.dto';
import { IconDto } from 'src/types/icon.dto';
import { Color } from './color.model';
import { Icon } from './icon.model';

@InputType()
export class CreateCategoryInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => Color, { nullable: true })
  color?: ColorDto;

  @Field(() => Icon, { nullable: true })
  icon?: IconDto;
}
