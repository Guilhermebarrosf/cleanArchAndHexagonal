import { Express } from 'express'
import { FindProductbyIdUseCase } from '../../../../../core/usecase/Product/FindProductbyIdUseCase'
import { JwtProvider } from '../jwtProvider'
import AuthMiddleware from '../../middlewares/AuthMiddleware'
export class FindProductbyIdController {
    constructor(
        server: Express,
        useCase: FindProductbyIdUseCase
    ) {
        server.get('/api/product/:id', AuthMiddleware(), async (req, res) => {
            try {
                console.log('Finding product by id:', req.params.id);
                const output = await useCase.executeee({
                    id: req.params.id
                })
                res.status(200).json({ output })
            } catch (error: any) {
                res.status(400).json({ error: error.message })
            }
        })
    }
}