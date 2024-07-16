import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from 'src/categorie/schemas/categorie.schema';
import { CategorieDto } from 'src/types/categories.dto';
import { GetAllCategoriesQuery } from './get-all-categories.query';

@QueryHandler(GetAllCategoriesQuery)
export class GetAllCategoryHandler
  implements IQueryHandler<GetAllCategoriesQuery, CategorieDto[]>
{
  constructor(
    @InjectModel(Category.name)
    private readonly categorieModel: Model<CategoryDocument>,
  ) {}

  async execute(query: GetAllCategoriesQuery): Promise<CategorieDto[]> {
    const { userId } = query;

    const allCategories: CategorieDto[] = await this.categorieModel.find({
      user: userId,
    });

    return allCategories;
  }
}
