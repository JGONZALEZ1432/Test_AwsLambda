// src/usecases/GetItemsUseCase.ts

import { Item } from '../domain/entities/Item';
import { DynamoDBItemRepository } from '../infrastructure/repositories/DynamoDBItemRepository';

export class GetItemsUseCase {
  constructor(private readonly itemRepository: DynamoDBItemRepository) {}

  async execute(): Promise<Item[]> {
    return await this.itemRepository.getAll();
  }
}
