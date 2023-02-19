export interface IDataAccessLayer {
    getItem(id: string): Promise<any>;
  }