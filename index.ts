import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body || '');
    const { name } = body;

    if (!name) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Name is required',
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Hello, ${name}!`,
      }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error',
      }),
    };
  }
};
