import { defineFunction, secret } from '@aws-amplify/backend';

export const saveFavoriteRecipe = defineFunction({
  name: 'saveFavoriteRecipe',
  environment: {
    SPOONACULAR_API_KEY: secret('SPOONACULAR_API_KEY'),
  },
});