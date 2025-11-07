import bcrypt from 'bcryptjs';

export class User {
  id: string | null;
  name: string;
  email: string;
  password: string;
  token: string | null = null;

  constructor(id: string | null, name: string, email: string, password: string, token?: string | null) {
    if (!name || name.trim().length < 2) throw new Error("Username is required.")
    
    if (!email || !email.includes('@')) throw new Error("Invalid email.")
    
    if (!password || password.length < 6) throw new Error("The password must be at least 6 characters long.")
    

    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.token = token ?? null;
  }

  async validatePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password);
  }

  static async hashPassword(plainPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plainPassword, salt);
  }
}