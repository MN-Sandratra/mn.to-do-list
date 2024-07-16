import { Types } from 'mongoose';

export class CreateTaskCommand {
  constructor(
    public readonly user: Types.ObjectId,
    public readonly category: Types.ObjectId,
    public readonly name: string,
    public readonly date: string,
  ) {}
}
