/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const SpoonacularGetRecipe = /* GraphQL */ `query SpoonacularGetRecipe(
  $httpMethod: String!
  $path: String!
  $pathParameters: SpoonacularGetRecipePathParametersInput
  $queryStringParameters: SpoonacularGetRecipeQueryStringParametersInput
) {
  SpoonacularGetRecipe(
    httpMethod: $httpMethod
    path: $path
    pathParameters: $pathParameters
    queryStringParameters: $queryStringParameters
  )
}
` as GeneratedQuery<
  APITypes.SpoonacularGetRecipeQueryVariables,
  APITypes.SpoonacularGetRecipeQuery
>;
export const getConversationConversationAI = /* GraphQL */ `query GetConversationConversationAI($id: ID!) {
  getConversationConversationAI(id: $id) {
    createdAt
    id
    messages {
      nextToken
      __typename
    }
    metadata
    name
    owner
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetConversationConversationAIQueryVariables,
  APITypes.GetConversationConversationAIQuery
>;
export const getConversationMessageConversationAI = /* GraphQL */ `query GetConversationMessageConversationAI($id: ID!) {
  getConversationMessageConversationAI(id: $id) {
    aiContext
    associatedUserMessageId
    content {
      text
      __typename
    }
    conversation {
      createdAt
      id
      metadata
      name
      owner
      updatedAt
      __typename
    }
    conversationId
    createdAt
    id
    owner
    role
    toolConfiguration {
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetConversationMessageConversationAIQueryVariables,
  APITypes.GetConversationMessageConversationAIQuery
>;
export const getSavedRecipe = /* GraphQL */ `query GetSavedRecipe($id: ID!) {
  getSavedRecipe(id: $id) {
    aggregateLikes
    cheap
    cookingMinutes
    createdAt
    creditsText
    cuisines
    dairyFree
    diets
    dishTypes
    gaps
    glutenFree
    healthScore
    id
    image
    instructions
    license
    lowFodmap
    occasions
    preparationMinutes
    pricePerServing
    readyInMinutes
    recipeId
    servings
    simplifiedInstructions {
      ingredients
      number
      step
      __typename
    }
    sourceName
    summary
    sustainable
    title
    updatedAt
    userId
    userProfile {
      allergies
      createdAt
      diet
      dietaryPreferences
      dislikedFoods
      email
      id
      intolerances
      likedFoods
      owner
      updatedAt
      userId
      username
      __typename
    }
    vegan
    vegetarian
    veryHealthy
    veryPopular
    weightWatcherSmartPoints
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetSavedRecipeQueryVariables,
  APITypes.GetSavedRecipeQuery
>;
export const getUserProfile = /* GraphQL */ `query GetUserProfile($id: ID!) {
  getUserProfile(id: $id) {
    allergies
    createdAt
    diet
    dietaryPreferences
    dislikedFoods
    email
    id
    intolerances
    likedFoods
    owner
    savedRecipes {
      nextToken
      __typename
    }
    updatedAt
    userId
    username
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetUserProfileQueryVariables,
  APITypes.GetUserProfileQuery
>;
export const listConversationConversationAIS = /* GraphQL */ `query ListConversationConversationAIS(
  $filter: ModelConversationConversationAIFilterInput
  $limit: Int
  $nextToken: String
) {
  listConversationConversationAIS(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      createdAt
      id
      metadata
      name
      owner
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListConversationConversationAISQueryVariables,
  APITypes.ListConversationConversationAISQuery
>;
export const listConversationMessageConversationAIS = /* GraphQL */ `query ListConversationMessageConversationAIS(
  $filter: ModelConversationMessageConversationAIFilterInput
  $limit: Int
  $nextToken: String
) {
  listConversationMessageConversationAIS(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      aiContext
      associatedUserMessageId
      conversationId
      createdAt
      id
      owner
      role
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListConversationMessageConversationAISQueryVariables,
  APITypes.ListConversationMessageConversationAISQuery
>;
export const listSavedRecipeByUserId = /* GraphQL */ `query ListSavedRecipeByUserId(
  $filter: ModelSavedRecipeFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
  $userId: ID!
) {
  listSavedRecipeByUserId(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
    userId: $userId
  ) {
    items {
      aggregateLikes
      cheap
      cookingMinutes
      createdAt
      creditsText
      cuisines
      dairyFree
      diets
      dishTypes
      gaps
      glutenFree
      healthScore
      id
      image
      instructions
      license
      lowFodmap
      occasions
      preparationMinutes
      pricePerServing
      readyInMinutes
      recipeId
      servings
      sourceName
      summary
      sustainable
      title
      updatedAt
      userId
      vegan
      vegetarian
      veryHealthy
      veryPopular
      weightWatcherSmartPoints
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSavedRecipeByUserIdQueryVariables,
  APITypes.ListSavedRecipeByUserIdQuery
>;
export const listSavedRecipes = /* GraphQL */ `query ListSavedRecipes(
  $filter: ModelSavedRecipeFilterInput
  $id: ID
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listSavedRecipes(
    filter: $filter
    id: $id
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      aggregateLikes
      cheap
      cookingMinutes
      createdAt
      creditsText
      cuisines
      dairyFree
      diets
      dishTypes
      gaps
      glutenFree
      healthScore
      id
      image
      instructions
      license
      lowFodmap
      occasions
      preparationMinutes
      pricePerServing
      readyInMinutes
      recipeId
      servings
      sourceName
      summary
      sustainable
      title
      updatedAt
      userId
      vegan
      vegetarian
      veryHealthy
      veryPopular
      weightWatcherSmartPoints
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListSavedRecipesQueryVariables,
  APITypes.ListSavedRecipesQuery
>;
export const listUserProfiles = /* GraphQL */ `query ListUserProfiles(
  $filter: ModelUserProfileFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      allergies
      createdAt
      diet
      dietaryPreferences
      dislikedFoods
      email
      id
      intolerances
      likedFoods
      owner
      updatedAt
      userId
      username
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserProfilesQueryVariables,
  APITypes.ListUserProfilesQuery
>;
