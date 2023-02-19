import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { IGetItemUseCase } from './use-case';

class GetItemController {
  private getItemUseCase: IGetItemUseCase;

  constructor(getItemUseCase: IGetItemUseCase) {
    this.getItemUseCase = getItemUseCase;
  }

  async handle(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    try {
      const { id } = event.pathParameters;
      const item = await this.getItemUseCase.execute(id);

      return {
        statusCode: 200,
        body: JSON.stringify(item),
      };
    } catch (error) {
      console.error(error);

      return {
        statusCode: 404,
        body: JSON.stringify({ message: error.message }),
      };
    }
  }
}

export { GetItemController };
