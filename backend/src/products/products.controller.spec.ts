import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product';

describe('ProductsController', () => {
  let controller: ProductsController;
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

  const mockProductsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST / - create', () => {
    it('should create a product and return it', async () => {
      const dto: CreateProductDto = {
        name: 'Apple',
        description: 'A red apple',
        stock: 10,
        categoryId: 1,
      };

      mockProductsService.create.mockResolvedValue(mockProduct);

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('GET / - findAll', () => {
    it('should return an array of products', async () => {
      const products: Product[] = [mockProduct];
      mockProductsService.findAll.mockResolvedValue(products);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(products);
    });
  });

  describe('GET /:id - findOne', () => {
    it('should return a single product by id', async () => {
      mockProductsService.findOne.mockResolvedValue(mockProduct);

      const result = await controller.findOne('abc-123');

      expect(service.findOne).toHaveBeenCalledWith('abc-123');
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('DELETE /:id - delete', () => {
    it('should delete a product by id', async () => {
      mockProductsService.delete.mockResolvedValue(undefined);

      const result = await controller.delete('abc-123');

      expect(service.delete).toHaveBeenCalledWith('abc-123');
      expect(service.delete).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
    });
  });

  describe('PATCH /:id - update', () => {
    it('should update a product and return the updated entity', async () => {
      const dto: UpdateProductDto = {
        name: 'Green Apple',
        description: 'A green apple',
        stock: 20,
        categoryId: 2,
      };
      const updatedProduct: Product = { ...mockProduct, ...dto };

      mockProductsService.update.mockResolvedValue(updatedProduct);

      const result = await controller.update('abc-123', dto);

      expect(service.update).toHaveBeenCalledWith('abc-123', dto);
      expect(service.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(updatedProduct);
    });
  });
});
