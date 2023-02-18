import { Book } from "../entities/book";

export interface BookRepository {
  create(book: Book): Promise<Book>;
  update(book: Book): Promise<Book>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Book>;
  findAll(): Promise<Book[]>;
}