import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Min, IsOptional } from "class-validator";

export class UpdateProductDto {
  @ApiProperty({
    type: String,
    description: "Name of the product",
    example: "Apple",
    required: false
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    type: String,
    description: "Description of the product",
    example: "A red apple",
    required: false
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: Number,
    description: "Product stock",
    example: 10,
    required: false
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  stock: number;

  @ApiProperty({
    type: Number,
    description: "Category ID of the product",
    example: 1,
    required: false
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  categoryId: number;
}