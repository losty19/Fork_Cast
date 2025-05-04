/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateAssistantResponseConversationAI = /* GraphQL */ `subscription OnCreateAssistantResponseConversationAI($conversationId: ID) {
  onCreateAssistantResponseConversationAI(conversationId: $conversationId) {
    associatedUserMessageId
    contentBlockDeltaIndex
    contentBlockDoneAtIndex
    contentBlockIndex
    contentBlockText
    contentBlockToolUse {
      input
      name
      toolUseId
      __typename
    }
    conversationId
    errors {
      errorType
      message
      __typename
    }
    id
    owner
    p
    stopReason
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateAssistantResponseConversationAISubscriptionVariables,
  APITypes.OnCreateAssistantResponseConversationAISubscription
>;
export const onCreateConversationMessageConversationAI = /* GraphQL */ `subscription OnCreateConversationMessageConversationAI(
  $filter: ModelSubscriptionConversationMessageConversationAIFilterInput
  $owner: String
) {
  onCreateConversationMessageConversationAI(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateConversationMessageConversationAISubscriptionVariables,
  APITypes.OnCreateConversationMessageConversationAISubscription
>;
export const onCreateSavedRecipe = /* GraphQL */ `subscription OnCreateSavedRecipe(
  $filter: ModelSubscriptionSavedRecipeFilterInput
) {
  onCreateSavedRecipe(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateSavedRecipeSubscriptionVariables,
  APITypes.OnCreateSavedRecipeSubscription
>;
export const onCreateUserProfile = /* GraphQL */ `subscription OnCreateUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
  $owner: String
) {
  onCreateUserProfile(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserProfileSubscriptionVariables,
  APITypes.OnCreateUserProfileSubscription
>;
export const onDeleteSavedRecipe = /* GraphQL */ `subscription OnDeleteSavedRecipe(
  $filter: ModelSubscriptionSavedRecipeFilterInput
) {
  onDeleteSavedRecipe(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteSavedRecipeSubscriptionVariables,
  APITypes.OnDeleteSavedRecipeSubscription
>;
export const onDeleteUserProfile = /* GraphQL */ `subscription OnDeleteUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
  $owner: String
) {
  onDeleteUserProfile(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserProfileSubscriptionVariables,
  APITypes.OnDeleteUserProfileSubscription
>;
export const onUpdateSavedRecipe = /* GraphQL */ `subscription OnUpdateSavedRecipe(
  $filter: ModelSubscriptionSavedRecipeFilterInput
) {
  onUpdateSavedRecipe(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateSavedRecipeSubscriptionVariables,
  APITypes.OnUpdateSavedRecipeSubscription
>;
export const onUpdateUserProfile = /* GraphQL */ `subscription OnUpdateUserProfile(
  $filter: ModelSubscriptionUserProfileFilterInput
  $owner: String
) {
  onUpdateUserProfile(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserProfileSubscriptionVariables,
  APITypes.OnUpdateUserProfileSubscription
>;
