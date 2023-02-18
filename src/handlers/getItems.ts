import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

const dynamoDB = new DynamoDB.DocumentClient();

export const handler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const params = {
      TableName: "my-dynamodb-table",
    };
    const { Items } = await dynamoDB.scan(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ items: Items }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
