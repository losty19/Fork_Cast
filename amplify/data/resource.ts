import { type ClientSchema, a, defineData, defineFunction, secret } from "@aws-amplify/backend";
// import { QueryString } from "aws-cdk-lib/aws-logs";
// import { spoonacularFunction } from "../functions/spoonacular/resource";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/

const spoonacularHandler = defineFunction({
  name: "spoonacularHandler",
  entry: "../functions/spoonacular/handler.ts",
  environment: {
    SPOONACULAR_API_KEY: secret('SPOONACULAR_API_KEY'),
  },
  timeoutSeconds: 30,
});
const saveFavoriteHandler = defineFunction({
  name: "saveFavoriteHandler",
  entry: "../functions/saveFavoriteRecipe/handler.ts",
  environment: {
    SPOONACULAR_API_KEY: secret('SPOONACULAR_API_KEY'),
  },
});

const schema = a.schema({
  // GetRecipeResponse: a.customType({
  //   statusCode: a.integer().required(),
  //   headers: a.customType({ // Not totally sure about this
  //     "Access-Control-Allow-Origin": a.string(),
  //     "Access-Control-Allow-Methods": a.string(),
  //   }),
  //   body: a.json().required(),
  // }),  USING .returns(a.json()) INSTEAD FOR NOW

  // THIS IS THE BODY JSON OBJECT THAT IS RETURNED FROM THE SPOONACULAR API
  //   offset: a.integer(),
  //   number: a.integer(),
  //   results: a.customType({
  //       id: a.integer(),
  //       title: a.string(),
  //       image: a.string(),
  //       imageType: a.string(),
  //     }),
  //   totalResults: a.integer(),

  // getComplexRecipe: a
  //   .query()
  //   .arguments({
  //     query: a.string().required(),
  //     number: a.integer(),
  //     instructionsRequired: a.boolean(),
  //     addRecipeInformation: a.boolean(),
  //   })
  //   .returns(a.json())
  //   .authorization((allow) => [allow.authenticated()])
  //   .handler(
  //     a.handler.custom({
  //       dataSource: "spoon_httpDataSource",
  //       entry: "./getComplexRecipe.js",
  //     })
  //   ),
  
  SpoonacularGetRecipe: a
    .query()
    .arguments({
      path: a.string().required(),
      httpMethod: a.string().required(),
      queryStringParameters: a.customType({
        query: a.string(),
        number: a.integer(),
        offset: a.integer(),
        diet: a.enum(["Gluten_Free", "Ketogenic", "Vegetarian", "Lacto_Vegetarian", "Ovo_Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal", "Whole30"]),
        intolerances: a.enum(["Peanut", "Dairy", "Egg", "Soy", "Wheat", "Fish", "Shellfish"]),
        type: a.enum(["main_course", "side_dish", "dessert", "appetizer", "salad", "bread", "breakfast", 
                      "soup", "beverage", "sauce", "marinade", "fingerfood", "snack", "drink"]),
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
        sort: a.enum(["popularity", "healthiness", "random", "time", "price", "sustainability"]),
        sortDirection: a.enum(["asc", "desc"]),
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
    .handler(a.handler.custom({
      dataSource: "spoon_httpDataSource",
      entry: "./getComplexRecipe.js",
    })),

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

  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.owner()]),

  // User Profile - Extended user information
  UserProfile: a
    .model({
      userId: a.string(),
      username: a.string(),
      email: a.string(),
      dietaryPreferences: a.enum(["Vegetarian", "Gluten_Free"]),
      allergies: a.enum(["Peanut", "Dairy", "Egg", "Soy", "Wheat", "Fish", "Shellfish", "Tree_Nut"]), 
      savedRecipes: a.hasMany("SavedRecipe", "recipeId"), // Reference to SavedRecipe
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [allow.owner()]),

  // Saved Recipes - Cache of Spoonacular recipes
  SavedRecipe: a
    .model({
      id: a.id(),
      userProfile: a.belongsTo("UserProfile", "recipeId"), // Reference to UserProfile
      userId: a.string(),
      recipeId: a.string(), // Spoonacular ID
      title: a.string(),
      image: a.string(),
      servings: a.integer(),
      readyInMinutes: a.integer(),
      summary: a.string(),
      instructions: a.string(),
      sourceUrl: a.string(),
      ingredients: a.customType({
        ingredients_id: a.integer(),
        name: a.string(),
        amount: a.float(),
        unit: a.string(),
        original: a.string(),
      }),
      nutrition: a.customType({
        calories: a.string(),
        protein: a.string(),
        carbs: a.string(),
        fat: a.string(),
      }),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [allow.authenticated()]) // Any authenticated user can CRUD
    .secondaryIndexes((index) => [
      index('userId'),
    ]),

  // Meal Plan
  MealPlan: a
    .model({
      userId: a.string(),
      date: a.datetime(),
      meals: a.customType({
        recipeId: a.string(),
        mealType: a.string(), // breakfast, lunch, dinner, snack
        servings: a.integer(),
      }),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [allow.owner()]),

  // Shopping List
  ShoppingList: a
    .model({
      userId: a.string(),
      items: a.customType({
        ingredientId: a.string(),
        name: a.string(),
        amount: a.float(),
        unit: a.string(),
        checked: a.boolean(),
        recipeId: a.string(), // Reference to recipe this came from
      }),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [allow.owner()]),

}) // <-- .schema
.authorization((allow) => [allow.authenticated()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  // authorizationModes: {
  //   // This tells the data client in your app (generateClient())
  //   // to sign API requests with the user authentication token.

  //   defaultAuthorizationMode: "userPool",
  // },
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
