import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Entity } from '../models/Entity';

export class EntityRepository {
  constructor(private readonly client: DocumentClient, private readonly tableName: string) {}

  async getById(id: string): Promise<Entity> {
    const result = await this.client
      .get({
        TableName: this.tableName,
        Key: { id },
      })
      .promise();

    return result.Item as Entity;
  }

  async searchByName(name: string): Promise<Entity[]> {
    const result = await this.client
      .query({
        TableName: this.tableName,
        IndexName: 'nameIndex',
        KeyConditionExpression: 'name = :name',
        ExpressionAttributeValues: {
          ':name': name,
        },
      })
      .promise();

    return result.Items as Entity[];
  }
}
