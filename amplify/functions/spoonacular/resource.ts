// amplify/functions/spoonacular/resource.ts
import { defineFunction } from '@aws-amplify/backend';

export const spoonacularFunction = defineFunction({
  name: 'spoonacular',
  environment: {
    SPOONACULAR_API_KEY: process.env.SPOONACULAR_API_KEY || 'default_api_key',
  }
});
