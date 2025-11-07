import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/ports/UserRepository';
import useCase from '../UseCase';

export interface CreateUserInputDTO {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase implements useCase<CreateUserInputDTO, User> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ name, email, password}: CreateUserInputDTO): Promise<User> {
    const existingUser = await this.userRepository.findWithEmail(email);
    if (existingUser) {
      throw new Error("Email in use.");
    }

    const userEntity = new User(null, name, email, password);
    const hashedPassword = await User.hashPassword(userEntity.password);
    userEntity.password = hashedPassword;

    return this.userRepository.create(userEntity);
  }
}