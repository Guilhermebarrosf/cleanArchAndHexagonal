import { Product } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/ports/ProductRepository';
import useCase from '../UseCase';

export interface CreateProductInputDTO {
  name: string;
  price: number;
}

export class CreateProductUseCase implements useCase<CreateProductInputDTO, Product> {
  constructor(private readonly userRepository: ProductRepository) {}

  async execute({ name, price}: CreateProductInputDTO): Promise<Product> {

    const productEntity = new Product(null, name, price);

    return this.userRepository.create(productEntity);
  }
}