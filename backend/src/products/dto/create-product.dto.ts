import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {
  @ApiProperty({
    type: String,
    description: "Name of the product",
    example: "Apple",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: "Description of the product",
    example: "A red apple",
    required: false
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: Number,
    description: "Stock of the product",
    example: 10,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({
    type: Number,
    description: "Category ID of the product",
    example: 1,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  categoryId: number;
}