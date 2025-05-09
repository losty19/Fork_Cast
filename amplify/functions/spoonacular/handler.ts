// amplify/functions/spoonacular/handler.ts
// import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'; // Not using anymore since I am using the Schema way instead
import axios, { AxiosInstance } from 'axios';
import type { Schema } from '../../data/resource';

// Don't worry if this line is red, it is because the env variable is not set in your local environment. 
// It will work when you deploy it to AWS.
import { env } from '$amplify/env/searchHandler'

// Axios instance in my Lambda function making requests to the Spoonacular API
const spoonacularClient: AxiosInstance = axios.create({
  baseURL: 'https://api.spoonacular.com',
  headers: { 'Content-Type': 'application/json' }
});

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS'
};
/*
Our API limits: 
    - 150 points per day
    - 1 point per request   *(For most requests)
    - 0.01 points per result returned *(For most requests)
    - 60 requests per minute

Here is a link to the documentation page for Spoonacluar API:
    https://spoonacular.com/food-api/docs
*/

export const handler: Schema["SpoonacularGetRecipe"]["functionHandler"] = async (event) => {
  // Frontend makes request, this function handles it
  console.log("Inside the handler.");
  try {
    const { path, httpMethod, queryStringParameters, pathParameters } = event.arguments;
    const route = `${httpMethod} ${path}`;
    console.log("route: ", route);
    console.log("queryStringParameters: ", queryStringParameters);

    switch (route) {
      // Get recipe by complex search 
      // DOCS: https://spoonacular.com/food-api/docs#Search-Recipes-Complex 
      case 'GET /recipes/complexSearch': {
        try {
          const response = await spoonacularClient.get('/recipes/complexSearch', {
            params: {
              ...queryStringParameters,
              apiKey: env.SPOONACULAR_API_KEY
            }
          });
          console.log('response.data: ', response.data);
          return response.data; // Amplify adds statusCode, headers I think
          
        } catch (error) {
          console.error('Error searching recipes:', error);
          throw new Error('Error searching recipes');
        }
      }
      default:
        throw new Error('Route Not Found');
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};