// src/interfaces/handlers.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CreateUser } from "../application/CreateUser";
import { DeleteUser } from "../application/DeleteUser";
import { GetUser } from "../application/GetUser";
import { UpdateUser } from "../application/UpdateUser";
import { DynamoDBUserRepository } from "../infrastructure/DynamoDBUserRepository";
import { User } from "../domain/entities/User";

const userRepository = new DynamoDBUserRepository();

const createUser = new CreateUser(userRepository);
const getUser = new GetUser(userRepository);
const updateUser = new UpdateUser(userRepository);
const deleteUser = new DeleteUser(userRepository);

export async function createUserHandler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const user: User = JSON.parse(event.body!);
    const createdUser = await createUser.execute(user);

    return {
      statusCode: 201,
      body: JSON.stringify(createdUser),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error creating user",
      }),
    };
  }
}

export async function getUserHandler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const id = event.pathParameters!.id ? String(event.pathParameters!.id): "0";
    const user = await getUser.execute(id);

    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "User not found",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error getting user",
      }),
    };
  }
}

export async function updateUserHandler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const user: User = JSON.parse(event.body!);
    const updatedUser = await updateUser.execute(user);

    return {
      statusCode: 200,
      body: JSON.stringify(updatedUser),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error updating user",
      }),
    };
  }
}

export async function deleteUserHandler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const id = event.pathParameters!.id ? String(event.pathParameters!.id): "0";
    await deleteUser.execute(id);

    return {
      statusCode: 204,
      body: "",
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error deleting user",
      }),
    };
  }
}
