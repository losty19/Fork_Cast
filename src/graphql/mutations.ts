/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const SaveFavoriteRecipe = /* GraphQL */ `mutation SaveFavoriteRecipe(
  $image: String
  $recipeId: String!
  $title: String!
  $userId: String!
) {
  SaveFavoriteRecipe(
    image: $image
    recipeId: $recipeId
    title: $title
    userId: $userId
  ) {
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
` as GeneratedMutation<
  APITypes.SaveFavoriteRecipeMutationVariables,
  APITypes.SaveFavoriteRecipeMutation
>;
export const conversationAI = /* GraphQL */ `mutation ConversationAI(
  $aiContext: AWSJSON
  $content: [AmplifyAIContentBlockInput]
  $conversationId: ID!
  $toolConfiguration: AmplifyAIToolConfigurationInput
) {
  conversationAI(
    aiContext: $aiContext
    content: $content
    conversationId: $conversationId
    toolConfiguration: $toolConfiguration
  ) {
    aiContext
    associatedUserMessageId
    content {
      text
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

    ... on ConversationMessageConversationAI {
      conversation {
        createdAt
        id
        metadata
        name
        owner
        updatedAt
        __typename
      }
    }
  }
}
` as GeneratedMutation<
  APITypes.ConversationAIMutationVariables,
  APITypes.ConversationAIMutation
>;
export const createAssistantResponseConversationAI = /* GraphQL */ `mutation CreateAssistantResponseConversationAI(
  $input: CreateConversationMessageConversationAIAssistantInput!
) {
  createAssistantResponseConversationAI(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateAssistantResponseConversationAIMutationVariables,
  APITypes.CreateAssistantResponseConversationAIMutation
>;
export const createAssistantResponseStreamConversationAI = /* GraphQL */ `mutation CreateAssistantResponseStreamConversationAI(
  $input: CreateConversationMessageConversationAIAssistantStreamingInput!
) {
  createAssistantResponseStreamConversationAI(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateAssistantResponseStreamConversationAIMutationVariables,
  APITypes.CreateAssistantResponseStreamConversationAIMutation
>;
export const createConversationConversationAI = /* GraphQL */ `mutation CreateConversationConversationAI(
  $condition: ModelConversationConversationAIConditionInput
  $input: CreateConversationConversationAIInput!
) {
  createConversationConversationAI(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateConversationConversationAIMutationVariables,
  APITypes.CreateConversationConversationAIMutation
>;
export const createConversationMessageConversationAI = /* GraphQL */ `mutation CreateConversationMessageConversationAI(
  $condition: ModelConversationMessageConversationAIConditionInput
  $input: CreateConversationMessageConversationAIInput!
) {
  createConversationMessageConversationAI(
    condition: $condition
    input: $input
  ) {
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
` as GeneratedMutation<
  APITypes.CreateConversationMessageConversationAIMutationVariables,
  APITypes.CreateConversationMessageConversationAIMutation
>;
export const createSavedRecipe = /* GraphQL */ `mutation CreateSavedRecipe(
  $condition: ModelSavedRecipeConditionInput
  $input: CreateSavedRecipeInput!
) {
  createSavedRecipe(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateSavedRecipeMutationVariables,
  APITypes.CreateSavedRecipeMutation
>;
export const createUserProfile = /* GraphQL */ `mutation CreateUserProfile(
  $condition: ModelUserProfileConditionInput
  $input: CreateUserProfileInput!
) {
  createUserProfile(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateUserProfileMutationVariables,
  APITypes.CreateUserProfileMutation
>;
export const deleteConversationConversationAI = /* GraphQL */ `mutation DeleteConversationConversationAI(
  $condition: ModelConversationConversationAIConditionInput
  $input: DeleteConversationConversationAIInput!
) {
  deleteConversationConversationAI(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteConversationConversationAIMutationVariables,
  APITypes.DeleteConversationConversationAIMutation
>;
export const deleteConversationMessageConversationAI = /* GraphQL */ `mutation DeleteConversationMessageConversationAI(
  $condition: ModelConversationMessageConversationAIConditionInput
  $input: DeleteConversationMessageConversationAIInput!
) {
  deleteConversationMessageConversationAI(
    condition: $condition
    input: $input
  ) {
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
` as GeneratedMutation<
  APITypes.DeleteConversationMessageConversationAIMutationVariables,
  APITypes.DeleteConversationMessageConversationAIMutation
>;
export const deleteSavedRecipe = /* GraphQL */ `mutation DeleteSavedRecipe(
  $condition: ModelSavedRecipeConditionInput
  $input: DeleteSavedRecipeInput!
) {
  deleteSavedRecipe(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteSavedRecipeMutationVariables,
  APITypes.DeleteSavedRecipeMutation
>;
export const deleteUserProfile = /* GraphQL */ `mutation DeleteUserProfile(
  $condition: ModelUserProfileConditionInput
  $input: DeleteUserProfileInput!
) {
  deleteUserProfile(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteUserProfileMutationVariables,
  APITypes.DeleteUserProfileMutation
>;
export const updateConversationConversationAI = /* GraphQL */ `mutation UpdateConversationConversationAI(
  $condition: ModelConversationConversationAIConditionInput
  $input: UpdateConversationConversationAIInput!
) {
  updateConversationConversationAI(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateConversationConversationAIMutationVariables,
  APITypes.UpdateConversationConversationAIMutation
>;
export const updateSavedRecipe = /* GraphQL */ `mutation UpdateSavedRecipe(
  $condition: ModelSavedRecipeConditionInput
  $input: UpdateSavedRecipeInput!
) {
  updateSavedRecipe(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateSavedRecipeMutationVariables,
  APITypes.UpdateSavedRecipeMutation
>;
export const updateUserProfile = /* GraphQL */ `mutation UpdateUserProfile(
  $condition: ModelUserProfileConditionInput
  $input: UpdateUserProfileInput!
) {
  updateUserProfile(condition: $condition, input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateUserProfileMutationVariables,
  APITypes.UpdateUserProfileMutation
>;
