import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { spoonacularFunction } from './functions/spoonacular/resource';
import { saveFavoriteRecipe } from './functions/saveFavoriteRecipe/resource';
// import { Environment } from 'aws-cdk-lib/aws-appconfig';

const backend = defineBackend({
  auth,
  data,
  spoonacularFunction,
  saveFavoriteRecipe,
});

// const spoon_httpDataSource = backend.data.addHttpDataSource(
//   'spoon_httpDataSource', 
//   'https://api.spoonacular.com'
// );
//
