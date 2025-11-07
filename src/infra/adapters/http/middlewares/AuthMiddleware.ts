import { NextFunction, Request, Response } from "express"
import { JwtProvider } from "../controllers/jwtProvider"

export default function AuthMiddleware (){
    return async (req: Request, res: Response, next: NextFunction) => {
        const jwtProvider = new JwtProvider()
        const token = req.header('authorization')?.replace('Bearer ', '')
        if (!token) {
            return res.status(401).json({ error: 'Token not provided' })
        }

        try {
            const decoded = jwtProvider.verifyToken(token)
            if (typeof decoded === 'object' && 'id' in decoded) {
                (req as any).userId = decoded.id
                next()
            }
            next()
        } catch (error: any) {
            console.log('Token verification failed:', error.message);
            return res.status(401).json({ error: 'Invalid token' })
        }
    }

}