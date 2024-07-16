import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ collection: 'tasks' })
export class Task {
  @Prop({ required: true, ref: 'users' })
  user: Types.ObjectId;

  @Prop({ required: true, ref: 'categories' })
  category: Types.ObjectId;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: Boolean, default: false })
  isCompleted: boolean;

  @Prop({ required: true, type: String })
  date: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
