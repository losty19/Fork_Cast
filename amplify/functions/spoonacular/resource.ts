// amplify/functions/spoonacular/resource.ts
import { defineFunction, secret } from '@aws-amplify/backend';

export const spoonacularFunction = defineFunction({
  name: 'spoonacularFunction',
  environment: {
    SPOONACULAR_API_KEY: secret('SPOONACULAR_API_KEY'),
  },
  timeoutSeconds: 30,
});
