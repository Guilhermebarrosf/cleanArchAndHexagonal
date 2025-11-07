import { UserRepository } from "../../domain/ports/UserRepository"
import UseCase from "../UseCase"

export default class UserLoginUseCase implements UseCase<UserLoginInput, UserLoginOutput> {
    constructor(
        private userRepository: UserRepository
    ) { }
    async execute(input: UserLoginInput): Promise<UserLoginOutput> {
        const user = await this.userRepository.findWithEmail(input.email)
        if (!user) throw new Error('User not found')
        
        const isPasswordValid = await user.validatePassword(input.password)
        if (!isPasswordValid) throw new Error('Invalid password')

        
        return {
            id: user.id!,
            name: user.name,
            email: user.email
        }
    }


}
export interface UserLoginInput {
    email: string;
    password: string;
}
export interface UserLoginOutput {
    id: string;
    name: string;
    email: string;
}

