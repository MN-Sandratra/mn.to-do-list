// dto/update-category.input.ts
import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ColorDto } from 'src/types/color.dto';
import { IconDto } from 'src/types/icon.dto';
import { Color } from './color.model';
import { Icon } from './icon.model';

@InputType()
export class UpdateCategoryInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isEditable?: boolean;

  @Field(() => Color, { nullable: true })
  color?: ColorDto;

  @Field(() => Icon, { nullable: true })
  icon?: IconDto;
}
