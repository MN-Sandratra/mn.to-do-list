import { Types } from 'mongoose';
import { ColorDto } from 'src/types/color.dto';
import { IconDto } from 'src/types/icon.dto';

export class CreateCategoryCommand {
  constructor(
    public readonly name: string,
    public readonly color: ColorDto,
    public readonly icon: IconDto,
    public readonly user: Types.ObjectId,
  ) {}
}
