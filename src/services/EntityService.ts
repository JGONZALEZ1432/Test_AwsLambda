import { EntityRepository } from '../repositories/EntityRepository';
import { Entity } from '../models/Entity';

export class EntityService {
  constructor(private readonly repository: EntityRepository) {}

  async searchByName(name: string): Promise<Entity[]> {
    return this.repository.searchByName(name);
  }
}
