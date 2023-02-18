import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/UserRepository";
//enviarlo a entorno
const TABLE_NAME = "vehicle_availability";

export class DynamoDBUserRepository implements UserRepository {
  private readonly documentClient: DocumentClient;

  constructor() {
    this.documentClient = new DocumentClient();
  }
  async save(user: User): Promise<User> {
    const params = {
      TableName: TABLE_NAME,
      Item: user,
    };

    await this.documentClient.put(params).promise();

    return user;
  }

  async getById(id: string): Promise<User | null> {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id,
      },
    };

    const result = await this.documentClient.get(params).promise();

    if (!result.Item) {
      return null;
    }

    return result.Item as User;
  }

  async update(user: User): Promise<User> {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id: user.id,
      },
      UpdateExpression: "SET #name = :name, #email = :email",
      ExpressionAttributeNames: {
        "#name": "name",
        "#email": "email",
      },
      ExpressionAttributeValues: {
        ":name": user.name,
        ":email": user.email,
      },
      ReturnValues: "ALL_NEW",
    };

    const result = await this.documentClient.update(params).promise();

    return result.Attributes as User;
  }

  async delete(id: string): Promise<void> {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id,
      },
    };

    await this.documentClient.delete(params).promise();
  }
}

 
