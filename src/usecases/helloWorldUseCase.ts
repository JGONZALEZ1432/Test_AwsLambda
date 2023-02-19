// src/usecases/helloWorldUseCase.ts
import { HelloWorldPresenter } from '../interfaces/presenters/helloWorldPresenter';

export class HelloWorldUseCase {
  constructor(private readonly presenter: HelloWorldPresenter) {}

  async execute(): Promise<string> {
    const message = 'Hello, world!';
    this.presenter.present(message);
    return message;
  }
}
