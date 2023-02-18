import { User } from "../domain/User";

export interface UserRepository {
  create(user: User): Promise<void>;
}

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
