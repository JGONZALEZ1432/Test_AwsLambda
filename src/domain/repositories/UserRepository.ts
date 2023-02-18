import { User } from "../entities/User";

export interface UserRepository {
  save(user: User): Promise<User>;
  getById(id: string): Promise<User | null>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}