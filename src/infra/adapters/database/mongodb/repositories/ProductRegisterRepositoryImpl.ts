import { Product } from "../../../../../core/domain/entities/Product";
import { ProductRepository } from "../../../../../core/domain/ports/ProductRepository";
import { IProductModel, ProductModel } from "../models/ProductModel";


export class ProductRegisterRepositoryImpl implements ProductRepository {
    findById(id: string): Promise<Product | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, userData: Partial<Product>): Promise<Product | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }

    async create(productEntity: Product): Promise<Product> {
        const dbData = {
            name: productEntity.name,
            price: productEntity.price,
        };
        const createdProduct = await ProductModel.create(dbData);
        return this.toDomain(createdProduct);
    }
    toDomain(mongoProduct: IProductModel | (IProductModel & { _id: any })): Product {
        const id = mongoProduct._id.toString();
        const { name, price } = mongoProduct;
        return new Product(id, name, price);
    }
}           