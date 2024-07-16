import { Types } from 'mongoose';

export class GetAllCompletedTasksQuery {
  constructor(public readonly userId: Types.ObjectId) {}
}
