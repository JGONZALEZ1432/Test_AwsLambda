import { User } from "../domain/User";

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface CreateUserResponse {
  user: User;
}

export interface CreateUserUseCase {
  execute(request: CreateUserRequest): Promise<CreateUserResponse>;
}

export class DefaultCreateUserUseCase implements CreateUserUseCase {
  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const user: User = {
      id: "1", // Generate a unique ID here
      name: request.name,
      email: request.email,
    };

    return { user };
  }
}
