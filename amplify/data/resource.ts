import { type ClientSchema, a, defineData, defineFunction, secret } from "@aws-amplify/backend";
// import { saveFavoriteRecipe } from "../functions/saveFavoriteRecipe/resource";
//import { type ClientSchema, a, defineData, defineFunction, secret } from "@aws-amplify/backend";

// import { QueryString } from "aws-cdk-lib/aws-logs";
// import { spoonacularFunction } from "../functions/spoonacular/resource";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/

// WAS DEFINING THESE FUNCTION TWICE
// THE DEFINITIONS ARE NOW ONLY HERE
// ********************************************************************

export const searchHandler = defineFunction({
  name: "searchHandler",
  entry: "../functions/spoonacular/handler.ts",
  environment: {
    SPOONACULAR_API_KEY: secret('SPOONACULAR_API_KEY'),
    // SPOONACULAR_API_KEY_ENV: process.env.SPOONACULAR_API_KEY,
  },
  timeoutSeconds: 10,
});
export const saveFavoriteHandler = defineFunction({
  name: "saveFavoriteHandler",
  entry: "../functions/saveFavoriteRecipe/handler.ts",
  environment: {
    SPOONACULAR_API_KEY: secret('SPOONACULAR_API_KEY'),
  },
});

const schema = a.schema({
  
  SpoonacularGetRecipe: a
    .query()
    .arguments({
      path: a.string().required(),
      httpMethod: a.string().required(),
      queryStringParameters: a.customType({
        query: a.string(),
        number: a.integer(),
        offset: a.integer(),
        diet: a.string(),
        intolerances: a.string(),
        type: a.string(),
        includeIngredients: a.string(),
        excludeIngredients: a.string(),
        instructionsRequired: a.boolean(),
        fillIngredients: a.boolean(),
        addRecipeInformation: a.boolean(),
        addRecipeNutrition: a.boolean(),
        author: a.string(),
        tags: a.string(),
        recipeBoxId: a.integer(),
        titleMatch: a.string(),
        maxReadyTime: a.integer(),
        ignorePantry: a.boolean(),
        sort: a.string(),
        sortDirection: a.string(),
        minCarbs: a.integer(),
        maxCarbs: a.integer(),
        minProtein: a.integer(),
        maxProtein: a.integer(),
        minCalories: a.integer(),
        maxCalories: a.integer(),
      }),
      pathParameters: a.customType({
        path_id: a.integer(),
      }),
    })
    .returns(a.json())
    .authorization((allow) => [allow.authenticated()])
    // .handler(a.handler.custom({
    //   dataSource: "spoon_httpDataSource",
    //   entry: "./getComplexRecipe.js",
    // })),
    .handler(a.handler.function(searchHandler)),

  SaveFavoriteRecipe: a
    .mutation()
    .arguments({
      userId: a.string().required(),
      recipeId: a.string().required(),
      image: a.string(),
      title: a.string().required(),
    })
    .returns(a.ref("SavedRecipe"))
    .authorization((allow) => [allow.authenticated()])
    .handler(a.handler.function(saveFavoriteHandler)),

  // Todo: a
  //   .model({
  //     content: a.string(),
  //   })
  //   .authorization((allow) => [allow.owner()]),

  // User Profile - Extended user information
  UserProfile: a
    .model({
      userId: a.string(),
      username: a.string(),
      email: a.string(),
      dietaryPreferences: a.string(), // Comma se-separated string of dietary preferences
      likedFoods: a.string(), // Comma se-separated string of liked foods
      allergies: a.string(), // Comma se-separated string of allergies
      dislikedFoods: a.string(), // Comma se-separated string of disliked foods
      diet: a.string(), // Diet typed
      intolerances: a.string(), // Comma se-separated string of intolerances

      savedRecipes: a.hasMany("SavedRecipe", "userId"), // Reference to SavedRecipe
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [allow.owner()]),
  

  // Saved Recipes - Cache of Spoonacular recipes
  SavedRecipe: a
    .model({
      id: a.id(),
      userProfile: a.belongsTo("UserProfile", "userId"), // Reference to UserProfile
      userId: a.id(),

      recipeId: a.string(), // Spoonacular ID
      image: a.string(),
      // imageType: a.string(),
      title: a.string(),
      readyInMinutes: a.integer(),
      servings: a.integer(),
      // sourceUrl: a.string(),
      vegetarian: a.boolean(),
      vegan: a.boolean(),
      glutenFree: a.boolean(),
      dairyFree: a.boolean(),
      veryHealthy: a.boolean(),
      cheap: a.boolean(),
      veryPopular: a.boolean(),
      sustainable: a.boolean(),
      lowFodmap: a.boolean(),
      weightWatcherSmartPoints: a.integer(),
      gaps: a.string(),
      preparationMinutes: a.integer(),
      cookingMinutes: a.integer(),
      aggregateLikes: a.integer(),
      healthScore: a.float(),
      creditsText: a.string(),
      license: a.string(),
      sourceName: a.string(),
      pricePerServing: a.float(),
      summary: a.string(),
      cuisines: a.string().array(),
      dishTypes: a.string().array(),
      diets: a.string().array(),
      occasions: a.string().array(),
      simplifiedInstructions: a.ref("simplifiedInstructions").array(), // Reference to simplifiedInstructions
      
      // Got rid of analyzedInstructions because we use a simplified version of it
      
      // analyzedInstructions: a.customType({
      //   name: a.string(),
      //   steps: a.customType({
      //     number: a.integer(),
      //     step: a.string(),
      //     ingredients: a.customType({
      //       id: a.integer(),
      //       name: a.string(),
      //       localizedName: a.string(),
      //       image: a.string(),
      //     }),
      //     equipment: a.customType({
      //       id: a.integer(),
      //       name: a.string(),
      //       localizedName: a.string(),
      //       image: a.string(),
      //     }),
      //     length: a.customType({
      //       number: a.integer(),
      //       unit: a.string(),
      //     }),
      //   })//.array(), // Array of steps
      // }),//.array(), // Array of instructions
      instructions: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [allow.authenticated()]) // Any authenticated user can CRUD
    .secondaryIndexes((index) => [
      index('userId').name('byUserId'),
    ]),

    simplifiedInstructions: a.customType({
      number: a.integer(),
      step: a.string(),
      ingredients: a.string().array(),
    }),

  // Meal Plan
  // MealPlan: a
  //   .model({
  //     userId: a.string(),
  //     date: a.datetime(),
  //     meals: a.customType({
  //       recipeId: a.string(),
  //       mealType: a.string(), // breakfast, lunch, dinner, snack
  //       servings: a.integer(),
  //     }),
  //     createdAt: a.datetime(),
  //     updatedAt: a.datetime(),
  //   })
  //   .authorization((allow) => [allow.owner()]),

  // Shopping List
  // ShoppingList: a
  //   .model({
  //     userId: a.string(),
  //     items: a.customType({
  //       ingredientId: a.string(),
  //       name: a.string(),
  //       amount: a.float(),
  //       unit: a.string(),
  //       checked: a.boolean(),
  //       recipeId: a.string(), // Reference to recipe this came from
  //     }),
  //     createdAt: a.datetime(),
  //     updatedAt: a.datetime(),
  //   })
  //   .authorization((allow) => [allow.owner()]),


  chat: a.conversation({
    aiModel: a.ai.model("Claude 3.5 Sonnet"),
    systemPrompt: "You are a helpful assistant that helps users find recipes. " +
                  "You will take their preferences and dietary restrictions into account.",
    // tools: [
    //   a.ai.dataTool({
    //     name: "SpoonacularGetRecipe",
    //     description: "Search via natural language for a recipe based on the user's preferences and requests",
    //     query: a.ref('SpoonacularGetRecipe'),
    //   }),
    // ],
  })
  .authorization((allow) => allow.owner()),

    // generateAI: a.generation({
    //   aiModel: a.ai.model("Amazon Nova Micro"),
    //   systemPrompt: 'You are a helpful assistant that helps users find recipes. \
    //                   You will take their preferences and dietary restrictions into account.\
    //                   You will focus your response to be availble to use with the Spoonacular API.',
    //   inferenceConfiguration: { // Can also set temperature and topP
    //     maxTokens: 1000,
    //   }
    // })
    // .arguments({
    //   prompt: a.string().required(),
    // })
    // // Maybe update this return type to be more specific for the Spoonacular API search endpoint
    // .returns(
    //   a.customType({
    //     response: a.string().required(),
    //   })
    // )
    // .authorization((allow) => allow.authenticated()),

}) // <-- .schema
.authorization((allow) => [allow.authenticated()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    // This tells the data client in your app (generateClient())
    // to sign API requests with the user authentication token.

    defaultAuthorizationMode: "userPool",
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
