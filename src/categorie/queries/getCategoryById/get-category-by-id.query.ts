import { Types } from 'mongoose';

export class GetCategoryByIdQuery {
  constructor(
    public readonly categorieId: string,
    public readonly userId: Types.ObjectId,
  ) {}
}
