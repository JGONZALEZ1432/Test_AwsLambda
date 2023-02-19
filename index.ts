import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { GetItemController } from './src/controller';
import { DynamoDataAccessLayer } from './src/repositoryService/data-access-layer';
import { GetItemUseCase } from './src/domain/caseUsePricing/use-case';
import { Constants } from './src/utils/Constants';

const tableName = Constants.TABLE_NAME;

const dataAccessLayer = new DynamoDataAccessLayer(tableName);
const getItemUseCase = new GetItemUseCase(dataAccessLayer);
const getItemController = new GetItemController(getItemUseCase);

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  return getItemController.handle(event);
}
