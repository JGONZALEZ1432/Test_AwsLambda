import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Book } from "../../domain/entities/book";
import { BookRepository } from "../../domain/repositories/book-repository";

const BOOKS_TABLE = "vehicle_availability";

export class DynamoDBBookRepository implements BookRepository {
  constructor(private client: DocumentClient) {}

  async create(book: Book): Promise<Book> {
    await this.client
      .put({
        TableName: BOOKS_TABLE,
        Item: book,
      })
      .promise();

    return book;
  }

  async update(book: Book): Promise<Book> {
    await this.client
      .update({
        TableName: BOOKS_TABLE,
        Key: { id: book.id },
        UpdateExpression: "set #title = :title, #author = :author",
        ExpressionAttributeNames: {
          "#title": "title",
          "#author": "author",
        },
        ExpressionAttributeValues: {
          ":title": book.title,
          ":author": book.author,
        },
      })
      .promise();

    return book;
  }

  async delete(id: string): Promise<void> {
    await this.client
      .delete({
        TableName: BOOKS_TABLE,
        Key: { id },
      })
      .promise();
  }

  async findById(id: string): Promise<Book> {
    const result = await this.client
      .get({
        TableName: BOOKS_TABLE,
        Key: { id },
      })
      .promise();

    return result.Item as Book;
  }

  async findAll(): Promise<Book[]> {
    const result = await this.client
      .scan({
        TableName: BOOKS_TABLE,
      })
      .promise();

    return result.Items as Book[];
  }
}