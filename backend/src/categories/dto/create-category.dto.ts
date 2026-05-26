import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    description: "Name of the category",
    example: "Electronics",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: "Description of the category",
    example: "Electronics category description",
    required: false
  })
  @IsString()
  @IsOptional()
  description: string | null;
}