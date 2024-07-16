import { Types } from 'mongoose';

export class DeleteTaskCommand {
  constructor(
    public readonly taskId: Types.ObjectId,
    public readonly userId: Types.ObjectId,
  ) {}
}
