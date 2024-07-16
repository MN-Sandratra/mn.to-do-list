import { Types } from 'mongoose';

export class GetAllTasksByCategoryQuery {
  constructor(
    public readonly userId: Types.ObjectId,
    public readonly categoryId: string,
  ) {}
}
