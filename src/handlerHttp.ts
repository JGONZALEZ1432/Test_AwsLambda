import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBUserRepository } from './adapters/RepositoryService';
import { User } from './domain/user';
import { UserRepository } from './infrastructure/interfaceUser';
const userRepository: UserRepository = new DynamoDBUserRepository('myuser')// initialize your UserRepository implementation here


// const userRepository = new DynamoDBUserRepository('my-users-table');
// const createUserUseCase = new CreateUser(userRepository);
// const getUserUseCase = new GetUser(userRepository);
// const updateUserUseCase = new UpdateUser(userRepository);
// const deleteUserUseCase = new DeleteUser(userRepository);

export const createUser: APIGatewayProxyHandler = async (event) => {
  try {
    const user: User = JSON.parse(event.body);
    const useCase = new CreateUser(userRepository);
    await useCase.execute(user);
    return {
      statusCode: 201,
      body: JSON.stringify(user),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

export const getUser: APIGatewayProxyHandler = async (event) => {
  try {
    const id = event.pathParameters?.id;
    const useCase = new GetUser(userRepository);
    const user = await useCase.execute(id);
    if (user) {
      return {
        statusCode: 200,
        body: JSON.stringify(user),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'User not found' }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

export const updateUser: APIGatewayProxyHandler = async (event) => {
  try {
    const user: User = JSON.parse(event.body);
    const useCase = new UpdateUser(userRepository);
    await useCase.execute(user);
    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

export const deleteUser: APIGatewayProxyHandler = async (event) => {
  try {
    const id = event.pathParameters?.id;
    const useCase = new DeleteUser(userRepository);
    await useCase.execute(id);
    return {
      statusCode: 204,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
