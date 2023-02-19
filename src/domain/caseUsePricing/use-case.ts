import { IDataAccessLayer } from '../../repositoryService/data-access-layer';

interface IGetItemUseCase {
  execute(id: string): Promise<any>;
}

class GetItemUseCase implements IGetItemUseCase {
  private dataAccessLayer: IDataAccessLayer;

  constructor(dataAccessLayer: IDataAccessLayer) {
    this.dataAccessLayer = dataAccessLayer;
  }

  async execute(id: string): Promise<any> {
    const item = await this.dataAccessLayer.getItem(id);

    if (!item) {
      throw new Error('Item not found');
    }

    return item;
  }
}

export { IGetItemUseCase, GetItemUseCase };
