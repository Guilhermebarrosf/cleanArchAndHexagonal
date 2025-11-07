import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/ports/UserRepository';
import useCase from '../UseCase';

export class FindUserByEmailUseCase implements useCase<String, User> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string): Promise<User> {
    const user = await this.userRepository.findWithEmail(email);
    if (!user) {
      throw new Error("User not found.");
    }
    return user;
  }
}