import { ColorDto } from 'src/types/color.dto';
import { IconDto } from 'src/types/icon.dto';

export class UpdateCategoryCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly color?: ColorDto,
    public readonly icon?: IconDto,
    public readonly isEditable?: boolean,
  ) {}
}
