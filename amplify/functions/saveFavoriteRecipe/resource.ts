import { defineFunction } from '@aws-amplify/backend';

export const saveFavoriteRecipe = defineFunction({
  name: 'saveFavoriteRecipe',
  entry: './handler.ts'
});