// src/infrastructure/repositories/DynamoDBItemRepository.ts

import { DynamoDB } from 'aws-sdk';
import { Item } from '../../domain/entities/Item';

const dynamoDb = new DynamoDB.DocumentClient();

export class DynamoDBItemRepository {
  async getAll(): Promise<Item[]> {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: process.env.DYNAMODB_TABLE_NAME as string,
    };

    const result = await dynamoDb.scan(params).promise();

    return result.Items as Item[];
  }

  async getById(id: string): Promise<Item | null> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: process.env.DYNAMODB_TABLE_NAME as string,
      Key: {
        id,
      },
    };

    const result = await dynamoDb.get(params).promise();

    if (!result.Item) {
      return null;
    }

    return result.Item as Item;
  }
}
