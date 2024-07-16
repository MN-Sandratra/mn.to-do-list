import { Types } from 'mongoose';

export class GetAllTasksQuery {
  constructor(public readonly userId: Types.ObjectId) {}
}
