import { Types } from 'mongoose';

export class GetTasksForTodayQuery {
  constructor(public readonly userId: Types.ObjectId) {}
}
