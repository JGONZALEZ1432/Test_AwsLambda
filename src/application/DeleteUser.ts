import { UserRepository } from "../domain/repositories/UserRepository";

export class DeleteUser {
  constructor(private readonly userRepository: UserRepository) {}

  

async execute(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }
}