import { DynamoDB } from 'aws-sdk';
import { EntityRepository } from './repositories/EntityRepository';
import { EntityService } from './services/EntityService';

const dynamoDb = new DynamoDB.DocumentClient();
const repository = new EntityRepository(dynamoDb,"prueba");
const service = new EntityService(repository);

export async function handler(event: any) {
  try {
    const name = event.queryStringParameters.name;

    if (!name) {
      throw new Error('Name is required');
    }

    const entities = await service.searchByName(name);

    return {
      statusCode: 200,
      body: JSON.stringify(entities),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
}
