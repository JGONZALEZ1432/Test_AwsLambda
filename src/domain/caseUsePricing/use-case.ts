import { IDataAccessLayer } from '../../repositoryService/data-access-layer';
import { Message } from '../../utils/Constants';

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
      return Message._404_NOT_FOUND;
    }

    return item;
  }
}

export { IGetItemUseCase, GetItemUseCase };
