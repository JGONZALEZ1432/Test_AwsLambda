import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/UserRepository";

export class GetUser {
  constructor(private readonly userRepository: UserRepository) {}

  

async execute(id: string): Promise<User | null> {
    
   
return this.userRepository.getById(id);
  }
}