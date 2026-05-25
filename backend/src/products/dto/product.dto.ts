export class ProductDto {
  constructor(
    readonly productId: string,
    readonly name: string,
    readonly description: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly deletedAt: Date | null,
    readonly stock: number,
    readonly categoryId: number
  ) { }
}