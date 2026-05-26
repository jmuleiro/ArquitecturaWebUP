import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category: Category = this.categoryRepo.create(createCategoryDto);
    return await this.categoryRepo.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepo.find();
  }

  async findOne(id: number): Promise<Category | null> {
    return await this.categoryRepo.findOne({ where: { categoryId: id } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category: Category | null = await this.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    const updatedCategory: Category = this.categoryRepo.merge(category, updateCategoryDto);
    return await this.categoryRepo.save(updatedCategory);
  }

  async delete(id: string): Promise<void> {
    const category: Category | null = await this.findOne(Number(id));
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    await this.categoryRepo.delete(id);
  }
}
