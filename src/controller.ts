import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { IGetItemUseCase } from './domain/caseUsePricing/use-case';
import { Message } from './utils/Constants';

class GetItemController {
  private getItemUseCase: IGetItemUseCase;

  constructor(getItemUseCase: IGetItemUseCase) {
    this.getItemUseCase = getItemUseCase;
  }

  async handle(event: APIGatewayProxyEvent): Promise<any> {
    try {
      const { id } = event.queryStringParameters;
      const item = await this.getItemUseCase.execute(id);

      return {
        statusCode: 200,
        body: JSON.stringify(item),
      };
    } catch (error) {
      console.error(error);
      return Message._500_UNCONTROLLED_ERROR;
    }
  }
}

export { GetItemController };
