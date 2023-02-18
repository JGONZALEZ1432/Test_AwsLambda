import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBItemRepository } from '../infrastructure/repositories/DynamoDBItemRepository';
import { GetItemsUseCase } from './GetItemsUseCase';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const itemRepository = new DynamoDBItemRepository();
        const getItemsUseCase = new GetItemsUseCase(itemRepository);
        const items = await getItemsUseCase.execute();
        return {
            statusCode: 200,
            body: JSON.stringify(items),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' }),
        };
    }
};