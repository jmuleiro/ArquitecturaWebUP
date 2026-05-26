import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { Product } from '@src/products/entities/product';

@Entity('Category')
export class Category {
  @PrimaryGeneratedColumn({ name: 'CATEGORY_ID' })
  categoryId: number = 0; // Default no category

  @Column({ name: 'NAME', type: 'char', length: 50 })
  name: string = "No Category";

  @Column({ name: 'DESCRIPTION', type: 'char', length: 250, nullable: true })
  description: string | null = null;

  @Column({ name: 'CREATED_AT', type: 'datetime' })
  createdAt: Date = new Date(Date.now());

  @Column({ name: 'UPDATED_AT', type: 'datetime' })
  updatedAt: Date = new Date(Date.now());

  @Column({ name: 'DELETED_AT', type: 'datetime', nullable: true })
  deletedAt: Date | null = null;

  // Defines the One-to-Many relationship (One Category -> Many Products)
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}