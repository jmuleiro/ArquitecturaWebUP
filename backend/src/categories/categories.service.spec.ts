import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './entities/category';
import { NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

describe('CategoriesService', () => {
  let service: CategoriesService;

  const mockCategory: Category = {
    categoryId: 1,
    name: 'Electronics',
    description: 'Electronic devices and accessories',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
    deletedAt: null,
    products: [],
  };

  const mockCategoryRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    merge: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new category', async () => {
      const dto: CreateCategoryDto = {
        name: 'Electronics',
        description: 'Electronic devices and accessories',
      };

      mockCategoryRepository.create.mockReturnValue(mockCategory);
      mockCategoryRepository.save.mockResolvedValue(mockCategory);

      const result = await service.create(dto);

      expect(mockCategoryRepository.create).toHaveBeenCalledWith(dto);
      expect(mockCategoryRepository.save).toHaveBeenCalledWith(mockCategory);
      expect(result).toEqual(mockCategory);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const categories: Category[] = [mockCategory];
      mockCategoryRepository.find.mockResolvedValue(categories);

      const result = await service.findAll();

      expect(mockCategoryRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(categories);
    });
  });

  describe('findOne', () => {
    it('should return a category by id', async () => {
      mockCategoryRepository.findOne.mockResolvedValue(mockCategory);

      const result = await service.findOne(1);

      expect(mockCategoryRepository.findOne).toHaveBeenCalledWith({
        where: { categoryId: 1 },
      });
      expect(result).toEqual(mockCategory);
    });

    it('should return null if category not found', async () => {
      mockCategoryRepository.findOne.mockResolvedValue(null);

      const result = await service.findOne(999);

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update and return the updated category', async () => {
      const dto: UpdateCategoryDto = { name: 'Updated Electronics' };
      const updatedCategory: Category = { ...mockCategory, name: 'Updated Electronics' };

      mockCategoryRepository.findOne.mockResolvedValue(mockCategory);
      mockCategoryRepository.merge.mockReturnValue(updatedCategory);
      mockCategoryRepository.save.mockResolvedValue(updatedCategory);

      const result = await service.update(1, dto);

      expect(mockCategoryRepository.findOne).toHaveBeenCalledWith({
        where: { categoryId: 1 },
      });
      expect(mockCategoryRepository.merge).toHaveBeenCalledWith(mockCategory, dto);
      expect(mockCategoryRepository.save).toHaveBeenCalledWith(updatedCategory);
      expect(result).toEqual(updatedCategory);
    });

    it('should throw NotFoundException if category does not exist', async () => {
      mockCategoryRepository.findOne.mockResolvedValue(null);

      await expect(service.update(999, { name: 'Test' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should delete a category by id', async () => {
      mockCategoryRepository.findOne.mockResolvedValue(mockCategory);
      mockCategoryRepository.delete.mockResolvedValue({ affected: 1 });

      await service.delete('1');

      expect(mockCategoryRepository.findOne).toHaveBeenCalledWith({
        where: { categoryId: 1 },
      });
      expect(mockCategoryRepository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if category does not exist', async () => {
      mockCategoryRepository.findOne.mockResolvedValue(null);

      await expect(service.delete('999')).rejects.toThrow(NotFoundException);
    });
  });
});
