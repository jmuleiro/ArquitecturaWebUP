import { Body, Param } from '@nestjs/common';
import { Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags("Products")
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @ApiOperation({
    summary: "Create a new product",
    description: "Creates a new product with the given data"
  })
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @ApiOperation({
    summary: "Get all products",
    description: "Returns a list of all products"
  })
  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @ApiOperation({
    summary: "Get a product by id",
    description: "Returns a product with the given id"
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(id);
  }
}
