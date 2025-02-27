import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
// import { spoonacularFunction } from "../functions/spoonacular/resource";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/

const schema = a.schema({
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
      dietaryPreferences: a.enum([""]), // e.g., ["vegetarian", "gluten-free"]
      allergies: a.enum([""]),
      favoriteRecipes: a.enum([""]), // Array of recipe IDs
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [allow.owner()]),

  // Saved Recipes - Cache of Spoonacular recipes
  SavedRecipe: a
    .model({
      recipeId: a.string(), // Spoonacular ID
      title: a.string(),
      image: a.string(),
      servings: a.integer(),
      readyInMinutes: a.integer(),
      summary: a.string(),
      instructions: a.string(),
      sourceUrl: a.string(),
      ingredients: a.customType({
        id: a.integer(),
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
      tags: a.enum([""]), // e.g., ["vegetarian", "quick"]
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [allow.authenticated()]), // Any authenticated user can CRUD

  // User's Favorite Recipes
  FavoriteRecipe: a
    .model({
      userId: a.string(),
      recipeId: a.string(), // Reference to SavedRecipe
      notes: a.string(),
      rating: a.integer(), // 1-5 stars
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [allow.owner()]),

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

  // User's Pantry/Inventory
  Pantry: a
    .model({
      userId: a.string(),
      ingredients: a.customType({
        ingredientId: a.string(),
        name: a.string(),
        amount: a.float(),
        unit: a.string(),
        category: a.string(), // e.g., "spices", "dairy"
        expirationDate: a.datetime(),
      }),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [allow.owner()]),

  // Recipe Collections (e.g., "Quick Dinners", "Holiday Recipes")
  Collection: a
    .model({
      userId: a.string(),
      name: a.string(),
      description: a.string(),
      // recipeIds: a.list(a.string()), // References to SavedRecipes
      recipeIds: a.enum([""]),
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
    })
    .authorization((allow) => [allow.owner()]),

});

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
