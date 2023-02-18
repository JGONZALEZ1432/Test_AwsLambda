import { IEntity } from '../interfaces/IEntity';

export class Entity implements IEntity {
  id: string;
  name: string;
  age: number;

  constructor({ id, name, age }: IEntity) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
}
