import { APIGatewayProxyHandler } from "aws-lambda";
import { DefaultCreateUserUseCase, CreateUserUseCase } from "../useCases/CreateUser";

export const createUser: APIGatewayProxyHandler = async (event) => {
  const requestBody = JSON.parse(event.body);
  const useCase: CreateUserUseCase = new DefaultCreateUserUseCase();
  const response = await useCase.execute(requestBody);

  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
