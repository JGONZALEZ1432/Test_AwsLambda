// src/interfaces/http/book-router.ts

import { APIGatewayProxyHandler } from "aws-lambda";
import serverless from "serverless-http";
import express from "express";
import {
  createBook,
  updateBook,
  deleteBook,
  findBookById,
  findAllBooks,
} from "./book-controller";

const app = express();

app.use(express.json());

app.post("/books", createBook as APIGatewayProxyHandler);
app.put("/books", updateBook as APIGatewayProxyHandler);
app.delete("/books/:id", deleteBook as APIGatewayProxyHandler);
app.get("/books/:id", findBookById as APIGatewayProxyHandler);
app.get("/books", findAllBooks as APIGatewayProxyHandler);

export const handler = serverless(app);
