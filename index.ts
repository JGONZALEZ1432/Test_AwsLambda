import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GetItemController } from './src/controller';
import { DynamoDataAccessLayer } from './src/repositoryService/data-access-layer';
import { GetItemUseCase } from './src/domain/caseUsePricing/use-case';

const tableName = "vehicle_availability";

const dataAccessLayer = new DynamoDataAccessLayer(tableName);
const getItemUseCase = new GetItemUseCase(dataAccessLayer);
const getItemController = new GetItemController(getItemUseCase);

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  return getItemController.handle(event);
}
