import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
 } from "typeorm";
import { Category } from '@src/categories/entities/category';

@Entity('Product')
export class Product {
  @PrimaryGeneratedColumn('uuid', { name: 'PRODUCT_ID' })
  productId: string = "";

  @Column({ name: 'NAME', type: 'char', length: 50})
  name: string = "";

  @Column({ name: 'DESCRIPTION', type: 'char', length: 250, nullable: true })
  description: string | null = null;

  @Column({ name: 'CREATED_AT', type: 'date' })
  createdAt: Date = new Date(Date.now());

  @Column({ name: 'UPDATED_AT', type: 'date' })
  updatedAt: Date = new Date(Date.now());

  @Column({ name: 'DELETED_AT', type: 'date', nullable: true })
  deletedAt: Date | null = null;

  @Column({ name: 'STOCK', type: 'int' })
  stock: number = 0;

  @Column({ name: 'CATEGORY_ID', type: 'int' })
  categoryId: number = 0; // Default no category

  // Defines the Many-to-One relationship (Many Products -> One Category)
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'CATEGORY_ID' }) // Maps the relation to the physical column
  category: Category = new Category();
}