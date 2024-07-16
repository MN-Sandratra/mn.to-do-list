import { Types } from 'mongoose';

export class DeleteCategoryCommand {
  constructor(
    public readonly categoryId: string,
    public readonly userId: Types.ObjectId,
  ) {}
}
