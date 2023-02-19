import { DynamoDB } from 'aws-sdk';
import { IDataAccessLayer } from '../domain/request-model/requestModelInput';

class DynamoDataAccessLayer implements IDataAccessLayer {
  private dynamoClient: DynamoDB.DocumentClient;
  private tableName: string;

  constructor(tableName: string) {
    this.dynamoClient = new DynamoDB.DocumentClient();
    this.tableName = tableName;
  }

  async getItem(id: string): Promise<any> {
    const params = {
      TableName: this.tableName,
      Key: {
        id,
      },
    };

    const { Item } = await this.dynamoClient.get(params).promise();

    return Item;
  }
}

export { IDataAccessLayer, DynamoDataAccessLayer };
