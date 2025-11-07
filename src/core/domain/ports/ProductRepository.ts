import { Product } from '../entities/Product';

export interface ProductRepository {
  create(user: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  update(id: string, userData: Partial<Product>): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<Product[]>;
}