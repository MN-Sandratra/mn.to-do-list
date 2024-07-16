import { User } from 'src/user/schemas/user.schema';
import { ColorDto } from './color.dto';
import { IconDto } from './icon.dto';

export type CategorieDto = {
  _id: string;
  name: string;
  user: User | string;
  isEditable: boolean;
  color: ColorDto;
  icon: IconDto;
};
