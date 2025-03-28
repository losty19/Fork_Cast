// amplify/functions/spoonacular/handler.ts
// import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'; // Not using anymore since I am using the Schema way instead
// import axios, { AxiosInstance } from 'axios';
import type { Schema } from '../../data/resource';

// Axios instance in my Lambda function making requests to the Spoonacular API
// const spoonacularClient: AxiosInstance = axios.create({
//   baseURL: 'https://api.spoonacular.com',
//   headers: { 'Content-Type': 'application/json' }
// });
/*
Our API limits: 
    - 150 points per day
    - 1 point per request   *(For most requests)
    - 0.01 points per result returned *(For most requests)
    - 60 requests per minute

Here is a link to the documentation page for Spoonacluar API:
    https://spoonacular.com/food-api/docs
*/

const BASE_URL = 'https://api.spoonacular.com';

async function getComplexSearch(queryStringParameters: Record<string, any>) {
  const url = new URL(`${BASE_URL}/recipes/complexSearch`);
  const apiKey = process.env.SPOONACULAR_API_KEY || ''; // Need this line to fix the possible undefined error
  const params = new URLSearchParams({
     ...queryStringParameters,
     apiKey,
  });

  try {
    console.log('URL:', url.toString());
    console.log('Params:', params.toString());

    const response = await fetch(url.toString() + '?' + params.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Data complex search response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching complex recipe:', error);
    throw error;
  }
}

// Main handler
export const handler: Schema["SpoonacularGetRecipe"]["functionHandler"] = async (event) => {
  console.log("HELLO I AM HERE IN THE HANDLER");
  const { path, httpMethod, queryStringParameters, pathParameters } = event.arguments;
  console.log('Event is :', event);
  try {
    console.log('Event:', event);
    const route = `${httpMethod} ${path}`;
    console.log('Route:', route);
    console.log('Query Parameters:', queryStringParameters);
    console.log('Path Parameters:', pathParameters);

    const searchData = await getComplexSearch(queryStringParameters || {});
    return searchData; // Amplify wraps this in { statusCode: 200, body: ... }
    
  } catch (error) {
    console.error('Handler Error:', error);
    return {
      statusCode: 501,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};

/*
export const handler: Schema["SpoonacularGetRecipe"]["functionHandler"] = async (event) => {
  // Frontend makes request, this function handles it

  try {
    const { path, httpMethod, queryStringParameters, pathParameters } = event.arguments;

    const route = `${httpMethod} ${path}`;
    console.log('Route:', route);
    console.log('Query String Parameters:', queryStringParameters);
    console.log('Path Parameters:', pathParameters);
    // console.log('API Key:', process.env.SPOONACULAR_API_KEY);
    
    switch (route) {
      // Get recipe by complex search 
      // DOCS: https://spoonacular.com/food-api/docs#Search-Recipes-Complex 
      case 'GET /recipes/search': {
        try {
          const response = await spoonacularClient.get('/recipes/complexSearch', {
            params: {
              ...queryStringParameters,
              apiKey: process.env.SPOONACULAR_API_KEY,
              instructionsRequired: true,
              addRecipeInformation: true,
            },
          });
          console.log('Response:', response.data);
          return response.data; // Amplify adds statusCode, headers I think
        } catch (error) {
          console.error('Error searching recipes:', error);
          if (axios.isAxiosError(error)) {
            console.error('Axios Error Details:', {
              message: error.message,
              response: error.response?.data,
              status: error.response?.status,
            });
          }
          throw new Error('Error searching recipes');
        }
      }

      default:
        throw new Error('Route Not Found');
    }
  } catch (error) {
    console.error('Error:', error);
    console.log("Error Message: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};
*/