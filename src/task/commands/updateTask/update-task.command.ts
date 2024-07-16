import { Types } from 'mongoose';

export class UpdateTaskCommand {
  constructor(
    public readonly taskId: Types.ObjectId,
    public readonly category?: Types.ObjectId,
    public readonly name?: string,
    public readonly date?: string,
  ) {}
}
