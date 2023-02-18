import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/UserRepository";

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  

async execute(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}