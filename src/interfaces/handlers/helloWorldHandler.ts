// src/interfaces/handlers/helloWorldHandler.ts
import { APIGatewayEvent } from 'aws-lambda';
import { HelloWorldPresenter } from '../presenters/helloWorldPresenter';
import { HelloWorldUseCase } from '../../usecases/helloWorldUseCase';

export const helloWorldHandler = async (event: APIGatewayEvent) => {
  const presenter = new HelloWorldPresenter();
  const useCase = new HelloWorldUseCase(presenter);

  const result = await useCase.execute();

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
