import { Express } from 'express'
import { CreateUserUseCase } from '../../../../../core/usecase/User/CreateUserUseCase'
export default class UserRegisterController {
    constructor(
        server: Express,
        useCase: CreateUserUseCase
    ) {
        server.post('/api/user/register',  async (req, res) => {
            try {
                console.log('Registering user:', req.body);
                await useCase.execute({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                res.status(201).send()
            }
            catch (err: any) {
                res.status(400).send(err.message)
            }
        })
    }
}