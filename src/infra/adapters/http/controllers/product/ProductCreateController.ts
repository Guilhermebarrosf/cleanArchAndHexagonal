export class ProductCreateController {
    constructor(private readonly createProductUseCase: any) {}
    
    async create(req: any, res: any) {
        const productData = req.body;
        const createdProduct = await this.createProductUseCase.execute(productData);
        res.status(201).json(createdProduct);
    }
}