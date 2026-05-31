import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category';

describe('CategoriesController', () => {
  let controller: CategoriesController;
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

  const mockCategoriesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: mockCategoriesService,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);

    // Clear mocks between tests
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST / - create', () => {
    it('should create a category and return it', async () => {
      const dto: CreateCategoryDto = {
        name: 'Electronics',
        description: 'Electronic devices and accessories',
      };

      mockCategoriesService.create.mockResolvedValue(mockCategory);

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCategory);
    });
  });

  describe('GET / - findAll', () => {
    it('should return an array of categories', async () => {
      const categories: Category[] = [mockCategory];
      mockCategoriesService.findAll.mockResolvedValue(categories);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(categories);
    });
  });

  describe('GET /:id - findOne', () => {
    it('should return a single category by id', async () => {
      mockCategoriesService.findOne.mockResolvedValue(mockCategory);

      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCategory);
    });
  });

  describe('PATCH /:id - update', () => {
    it('should update a category and return the updated entity', async () => {
      const dto: UpdateCategoryDto = { name: 'Updated Electronics' };
      const updatedCategory: Category = { ...mockCategory, name: 'Updated Electronics' };

      mockCategoriesService.update.mockResolvedValue(updatedCategory);

      const result = await controller.update('1', dto);

      expect(service.update).toHaveBeenCalledWith(1, dto);
      expect(service.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(updatedCategory);
    });
  });

  describe('DELETE /:id - delete', () => {
    it('should delete a category by id', async () => {
      mockCategoriesService.delete.mockResolvedValue(undefined);

      const result = await controller.delete('1');

      expect(service.delete).toHaveBeenCalledWith('1');
      expect(service.delete).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
    });
  });
});
