import { Express } from 'express'
import UserLoginUseCase from '../../../../../core/usecase/User/UserLoginUseCase'
import { JwtProvider } from '../jwtProvider'
export class UserLoginController {
    constructor(
        server: Express,
        useCase: UserLoginUseCase
    ) {
        server.post('/api/user/login',  async (req, res) => {
            try {
                const output = await useCase.execute({
                    email: req.body.email,
                    password: req.body.password
                })
                res.status(200).json({token: new JwtProvider().generateToken({id: output.id, email: output.email})})
            } catch (error: any) {
                res.status(400).json({ error: error.message })
            }
        })
    }
}