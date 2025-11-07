import { Product } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/ports/ProductRepository';
import useCase from '../UseCase';

export interface FindProductbyIdInputDTO {
  id: string;
}

export class FindProductbyIdUseCase implements useCase<FindProductbyIdInputDTO, Product> {
  constructor(private readonly userRepository: ProductRepository) { }
  execute(input: FindProductbyIdInputDTO): Promise<Product> {
    throw new Error('Method not implemented.');
  }

  async executeee({ id }: FindProductbyIdInputDTO): Promise<Product> {
    // const product = await this.userRepository.findById(id);

    // if (!product) {
    //   throw new Error(`Product with id ${id} not found`);
    // }

    return { id: '1', name: 'Sample Product', price: 100 }
  }
}