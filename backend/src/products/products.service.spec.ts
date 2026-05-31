import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './entities/product';
import { NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockProduct: Product = {
    productId: 'abc-123',
    name: 'Apple',
    description: 'A red apple',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
    deletedAt: null,
    stock: 10,
    categoryId: 1,
    category: null as any,
  };

  const mockProductRepository = {
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
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a new product', async () => {
      const dto: CreateProductDto = {
        name: 'Apple',
        description: 'A red apple',
        stock: 10,
        categoryId: 1,
      };

      mockProductRepository.create.mockReturnValue(mockProduct);
      mockProductRepository.save.mockResolvedValue(mockProduct);

      const result = await service.create(dto);

      expect(mockProductRepository.create).toHaveBeenCalledWith(dto);
      expect(mockProductRepository.save).toHaveBeenCalledWith(mockProduct);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('findAll', () => {
    it('should return an array of products with category relations', async () => {
      const products: Product[] = [mockProduct];
      mockProductRepository.find.mockResolvedValue(products);

      const result = await service.findAll();

      expect(mockProductRepository.find).toHaveBeenCalledWith({
        relations: { category: true },
      });
      expect(result).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      mockProductRepository.findOne.mockResolvedValue(mockProduct);

      const result = await service.findOne('abc-123');

      expect(mockProductRepository.findOne).toHaveBeenCalledWith({
        where: { productId: 'abc-123' },
      });
      expect(result).toEqual(mockProduct);
    });

    it('should return null if product not found', async () => {
      mockProductRepository.findOne.mockResolvedValue(null);

      const result = await service.findOne('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete a product by id', async () => {
      mockProductRepository.findOne.mockResolvedValue(mockProduct);
      mockProductRepository.delete.mockResolvedValue({ affected: 1 });

      await service.delete('abc-123');

      expect(mockProductRepository.findOne).toHaveBeenCalledWith({
        where: { productId: 'abc-123' },
      });
      expect(mockProductRepository.delete).toHaveBeenCalledWith('abc-123');
    });

    it('should throw NotFoundException if product does not exist', async () => {
      mockProductRepository.findOne.mockResolvedValue(null);

      await expect(service.delete('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update and return the updated product', async () => {
      const dto: UpdateProductDto = {
        name: 'Green Apple',
        description: 'A green apple',
        stock: 20,
        categoryId: 2,
      };
      const updatedProduct: Product = { ...mockProduct, ...dto };

      mockProductRepository.findOne.mockResolvedValue(mockProduct);
      mockProductRepository.merge.mockReturnValue(updatedProduct);
      mockProductRepository.save.mockResolvedValue(updatedProduct);

      const result = await service.update('abc-123', dto);

      expect(mockProductRepository.findOne).toHaveBeenCalledWith({
        where: { productId: 'abc-123' },
      });
      expect(mockProductRepository.merge).toHaveBeenCalledWith(mockProduct, dto);
      expect(mockProductRepository.save).toHaveBeenCalledWith(updatedProduct);
      expect(result).toEqual(updatedProduct);
    });

    it('should throw NotFoundException if product does not exist', async () => {
      mockProductRepository.findOne.mockResolvedValue(null);

      await expect(
        service.update('nonexistent', { name: 'Test' } as UpdateProductDto),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
