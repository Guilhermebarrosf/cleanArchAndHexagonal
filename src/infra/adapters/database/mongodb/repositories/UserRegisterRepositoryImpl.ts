import { UserRepository } from '../../../../../core/domain/ports/UserRepository';
import { User } from '../../../../../core/domain/entities/User';
import { UserModel, IUserModel } from '../models/UserModel';

export class UserRegisterRepositoryImpl implements UserRepository {

  private toDomain(mongoUser: IUserModel | (IUserModel & { _id: any })): User | null {
    if (!mongoUser) return null;
    
    const id = mongoUser._id.toString();
    const { name, email, password } = mongoUser;
    
    return new User(id, name, email, password || '');
  }

  async create(userEntity: User): Promise<User> {
    const dbData = {
      name: userEntity.name,
      email: userEntity.email,
      password: userEntity.password,
    };
    
    const newUser = new UserModel(dbData);
    await newUser.save();
    return this.toDomain(newUser)!;
  }

  async findWithEmail(email: string): Promise<User | null> {
    const mongoUser = await UserModel.findOne({ email }).select('+password').exec();
    return this.toDomain(mongoUser as any);
  }

  async findById(id: string): Promise<User | null> {
    const mongoUser = await UserModel.findById(id).exec();
    return this.toDomain(mongoUser as any);
  }

  async findAll(): Promise<User[]> {
    const mongoUsers = await UserModel.find().exec();
    return mongoUsers.map(u => this.toDomain(u as any)).filter(u => u !== null) as User[];
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    let dbData: Partial<IUserModel> = { ...userData };
    
    if (userData.password) {
      dbData.password = await User.hashPassword(userData.password);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, dbData, { new: true }).exec();
    return this.toDomain(updatedUser as any);
  }

  async delete(id: string): Promise<boolean> {
    await UserModel.findByIdAndDelete(id).exec();
    return true;
  }
}