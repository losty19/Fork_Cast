import { defineBackend, secret } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
// import { spoonacularFunction } from './functions/spoonacular/resource';
// import { saveFavoriteRecipe } from './functions/saveFavoriteRecipe/resource';
import { searchHandler } from './data/resource';
import { saveFavoriteHandler } from './data/resource';
// import { Environment } from 'aws-cdk-lib/aws-appconfig';

const backend = defineBackend({
  auth,
  data,
  // spoonacularFunction,
  // saveFavoriteRecipe,
  searchHandler,
  saveFavoriteHandler,
});

const spoon_httpDataSource = backend.data.addHttpDataSource(
  'spoon_httpDataSource', 
  'https://api.spoonacular.com',
  {
    authorizationConfig: {
      signingRegion: 'us-east-1',
      signingServiceName: 'appsync',
    }
  }
);

