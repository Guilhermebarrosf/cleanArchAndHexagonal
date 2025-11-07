import jwt from 'jsonwebtoken'
export class JwtProvider {
    private readonly secretKey: string
    constructor() {
        this.secretKey = process.env
            .JWT_SECRET_KEY as string
            console.log('JWT Secret Key:', this.secretKey);
    }
    generateToken(payload: object, expiresIn: number = 86400): string {
                    console.log('JWT Secret Key:', this.secretKey);

        return jwt.sign(payload, this.secretKey, { expiresIn })
    }
    verifyToken(token: string): object | string {
        console.log(jwt.verify(token, this.secretKey))
        return jwt.verify(token, this.secretKey);
    }
}