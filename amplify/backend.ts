import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { spoonacularFunction } from './functions/spoonacular/resource';

defineBackend({
  auth,
  data,
  spoonacularFunction,
});
