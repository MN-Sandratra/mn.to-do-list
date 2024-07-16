import { Types } from 'mongoose';

export class GetAllCategoriesQuery {
  constructor(public readonly userId: Types.ObjectId) {}
}
