// src/interfaces/http/book-controller.ts

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { BookService } from "../../domain/book-service";
import { Book } from "../../domain/entities/book";
import { DynamoDBBookRepository } from "../../infrastructure/repositories/dynamodb-book-repository";

const AWS = require("aws-sdk");
const dynamoDBClient = new AWS.DynamoDB.DocumentClient();
const bookRepository = new DynamoDBBookRepository(dynamoDBClient);
const bookService = new BookService(bookRepository);

export async function createBook(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    console.log('event',event.body)
    if(!event.body){
        console.log('Error')
    }
    const book = JSON.parse(String(event.body)) as Book;

    const createdBook = await bookService.createBook(book);

    return {
      statusCode: 201,
      body: JSON.stringify(createdBook),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred",
      }),
    };
  }
}

export async function updateBook(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const book = JSON.parse(String(event.body)) as Book;

    const updatedBook = await bookService.updateBook(book);

    return {
      statusCode: 200,
      body: JSON.stringify(updatedBook),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred",
      }),
    };
  }
}

export async function deleteBook(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const id = event.pathParameters?.id;

    await bookService.deleteBook(String(id));

    return {
      statusCode: 204,
      body: "",
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred",
      }),
    };
  }
}

export async function findBookById(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const id = event.pathParameters?.id;

    const book = await bookService.findBookById(String(id));

    if (book) {
      return {
        statusCode: 200,
        body: JSON.stringify(book),
      };
    } else {
      return {
        statusCode: 404,
        body: "",
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred " + error,
      }),
    };
  }
}

export async function findAllBooks(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const books = await bookService.findAllBooks();

    return {
      statusCode: 200,
      body: JSON.stringify(books),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occurred",
      }),
    };
  }
}
