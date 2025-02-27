import { handler } from '../amplify/functions/spoonacular/handler';
import { APIGatewayProxyEvent, Context, APIGatewayProxyResult } from 'aws-lambda';
import mockContext from 'aws-lambda-mock-context';
import dotenv from 'dotenv';

dotenv.config();
describe('Spoonacular Integration Test', () => {
  let context: Context;

  beforeEach(() => {
    context = mockContext();
    // process.env.SPOONACULAR_API_KEY = 'your_actual_spoonacular_api_key'; // Key is locally stored
  });

  xit('should return recipes based on search query', async () => {
    const event: Partial<APIGatewayProxyEvent> = {
      httpMethod: 'GET',
      path: '/recipes/search',
      queryStringParameters: { query: 'pasta' },
    };

    const result = await handler(event as APIGatewayProxyEvent, context, () => {}) as APIGatewayProxyResult;

    expect(result.statusCode).toBe(200);
    const data = JSON.parse(result.body);
    expect(data.results).toBeDefined();
    expect(data.results.length).toBeGreaterThan(0);
  });

  xit('should return similar recipes for a given recipe ID', async () => {
    const event: Partial<APIGatewayProxyEvent> = {
      httpMethod: 'GET',
      path: '/recipes/{id}/similar',
      pathParameters: { id: '715538' },
    };

    const result = await handler(event as APIGatewayProxyEvent, context, () => {}) as APIGatewayProxyResult;

    console.log('Response body: ', result.body);
    expect(result.statusCode).toBe(200);
    const data = JSON.parse(result.body);
    console.log('Parsed data: ', data);
    console.log('Parsed data type: ', typeof data);

    expect(data).toBeDefined();
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].title).toBeDefined();
  });

  xit('should return ingredient information for a given recipe ID', async () => {
    const event: Partial<APIGatewayProxyEvent> = {
      httpMethod: 'GET',
      path: '/recipes/{id}/ingredientWidget.json',
      pathParameters: { id: '1003464' },
    };

    const result = await handler(event as APIGatewayProxyEvent, context, () => {}) as APIGatewayProxyResult;

    expect(result.statusCode).toBe(200);
    const data = JSON.parse(result.body);
    expect(data.ingredients).toBeDefined();
    expect(data.ingredients.length).toBeGreaterThan(0);
  });

  xit('should return recipes based on ingredients', async () => {
    const event: Partial<APIGatewayProxyEvent> = {
      httpMethod: 'GET',
      path: '/recipes/findByIngredients',
      queryStringParameters: { ingredients: 'tomato,cheese' },
    };

    const result = await handler(event as APIGatewayProxyEvent, context, () => {}) as APIGatewayProxyResult;

    expect(result.statusCode).toBe(200);
    const data = JSON.parse(result.body);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0].title).toBeDefined();
  });
});
