import Category from "@/entities/Category";

export default class Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  stock: number;

  constructor(
    id: string,
    name: string,
    category: Category,
    stock: number,
    description?: string
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.stock = stock;
    this.description = description ?? "";
  }
}