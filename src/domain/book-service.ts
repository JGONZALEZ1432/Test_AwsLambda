// src/domain/services/book-service.ts

import { Book } from "./entities/book";
import { BookRepository } from "./repositories/book-repository";

export class BookService {
  constructor(private bookRepository: BookRepository) {}

  async createBook(book: Book): Promise<Book> {
    return await this.bookRepository.create(book);
  }

  async updateBook(book: Book): Promise<Book> {
    return await this.bookRepository.update(book);
  }

  async deleteBook(id: string): Promise<void> {
    return await this.bookRepository.delete(id);
  }

  async findBookById(id: string): Promise<Book> {
    return await this.bookRepository.findById(id);
  }

  async findAllBooks(): Promise<Book[]> {
    return await this.bookRepository.findAll();
  }
}
