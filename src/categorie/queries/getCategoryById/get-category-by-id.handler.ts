import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from 'src/categorie/schemas/categorie.schema';
import { CategorieDto } from 'src/types/categories.dto';
import { GetCategoryByIdQuery } from './get-category-by-id.query';

@QueryHandler(GetCategoryByIdQuery)
export class GetCategoryByIdHandler
  implements IQueryHandler<GetCategoryByIdQuery, CategorieDto>
{
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async execute(query: GetCategoryByIdQuery): Promise<CategorieDto> {
    const { categorieId, userId } = query;

    const currentCategorie: CategorieDto = await this.categoryModel.findOne({
      _id: categorieId,
      user: userId,
    });

    if (!currentCategorie)
      throw new NotFoundException(
        `Categorie with id ${categorieId} does not exist - in GetCategoryByIdHandler`,
      );

    return currentCategorie;
  }
}
