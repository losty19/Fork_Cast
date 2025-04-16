import type { Schema } from '../../data/resource';
import { env } from '$amplify/env/spoonacular';
import fetch from 'node-fetch';

const BASE_URL = 'https://api.spoonacular.com';
console.log("Handler initialized.");

/**
 * Function to make a GET request to the Spoonacular API's complexSearch endpoint.
 * @param queryStringParameters - The query parameters for the API call.
 * @returns The response data from the Spoonacular API.
 */
async function getComplexSearch(queryStringParameters: Record<string, any>) {
  const url = new URL(`${BASE_URL}/recipes/complexSearch`);
  const apiKey = env.SPOONACULAR_API_KEY; // Use the secret from the environment variables

  if (!apiKey) {
    throw new Error('SPOONACULAR_API_KEY is not defined');
  }

  // Add query parameters and the API key
  const params = new URLSearchParams({
    ...queryStringParameters,
    apiKey,
  });

  try {
    console.log('Constructed URL:', url.toString() + '?' + params.toString());

    const startTime = Date.now();
    const response = await fetch(url.toString() + '?' + params.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const endTime = Date.now();
    console.log('Time taken for API call:', endTime - startTime, 'ms');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Spoonacular API response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data from Spoonacular API:', error);
    throw error;
  }
}

/**
 * Main handler function for the Amplify Gen 2 schema.
 * Handles requests to the Spoonacular API's complexSearch endpoint.
 */
export const handler: Schema["SpoonacularGetRecipe"]["functionHandler"] = async (event) => {
  console.log("Handler invoked.");
  const { queryStringParameters } = event.arguments;

  try {
    console.log('Received query parameters:', queryStringParameters);

    // Call the Spoonacular API
    const searchData = await getComplexSearch(queryStringParameters || {});
    console.log('Search data returned from Spoonacular API:', searchData);

    // Return the data to the client
    return searchData;
  } catch (error) {
    console.error('Error in handler:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};

