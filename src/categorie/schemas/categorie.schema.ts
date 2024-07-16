import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ColorDto } from 'src/types/color.dto';
import { IconDto } from 'src/types/icon.dto';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ collection: 'categories' })
export class Category {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Boolean, required: true, default: true })
  isEditable: boolean;

  @Prop({ type: Object })
  color: ColorDto;

  @Prop({ type: Object })
  icon: IconDto;

  @Prop({ type: String, ref: 'users', required: true })
  user: Types.ObjectId;
}

export const CategorieSchema = SchemaFactory.createForClass(Category);
