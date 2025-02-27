import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { sayHello } from './functions/say-hello/resource'; // TESTING
import { spoonacularFunction } from './functions/spoonacular/resource';

defineBackend({
  auth,
  data,
  sayHello,  // TESTING
  spoonacularFunction,
});
