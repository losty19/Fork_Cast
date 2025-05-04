/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type SavedRecipe = {
  __typename: "SavedRecipe",
  aggregateLikes?: number | null,
  cheap?: boolean | null,
  cookingMinutes?: number | null,
  createdAt?: string | null,
  creditsText?: string | null,
  cuisines?: Array< string | null > | null,
  dairyFree?: boolean | null,
  diets?: Array< string | null > | null,
  dishTypes?: Array< string | null > | null,
  gaps?: string | null,
  glutenFree?: boolean | null,
  healthScore?: number | null,
  id: string,
  image?: string | null,
  instructions?: string | null,
  license?: string | null,
  lowFodmap?: boolean | null,
  occasions?: Array< string | null > | null,
  preparationMinutes?: number | null,
  pricePerServing?: number | null,
  readyInMinutes?: number | null,
  recipeId?: string | null,
  servings?: number | null,
  simplifiedInstructions?:  Array<simplifiedInstructions | null > | null,
  sourceName?: string | null,
  summary?: string | null,
  sustainable?: boolean | null,
  title?: string | null,
  updatedAt?: string | null,
  userId?: string | null,
  userProfile?: UserProfile | null,
  vegan?: boolean | null,
  vegetarian?: boolean | null,
  veryHealthy?: boolean | null,
  veryPopular?: boolean | null,
  weightWatcherSmartPoints?: number | null,
};

export type simplifiedInstructions = {
  __typename: "simplifiedInstructions",
  ingredients?: Array< string | null > | null,
  number?: number | null,
  step?: string | null,
};

export type UserProfile = {
  __typename: "UserProfile",
  allergies?: string | null,
  createdAt?: string | null,
  diet?: string | null,
  dietaryPreferences?: string | null,
  dislikedFoods?: string | null,
  email?: string | null,
  id: string,
  intolerances?: string | null,
  likedFoods?: string | null,
  owner?: string | null,
  savedRecipes?: ModelSavedRecipeConnection | null,
  updatedAt?: string | null,
  userId?: string | null,
  username?: string | null,
};

export type ModelSavedRecipeConnection = {
  __typename: "ModelSavedRecipeConnection",
  items:  Array<SavedRecipe | null >,
  nextToken?: string | null,
};

export type AmplifyAIContentBlockInput = {
  document?: AmplifyAIDocumentBlockInput | null,
  image?: AmplifyAIImageBlockInput | null,
  text?: string | null,
  toolResult?: AmplifyAIToolResultBlockInput | null,
  toolUse?: AmplifyAIToolUseBlockInput | null,
};

export type AmplifyAIDocumentBlockInput = {
  format: string,
  name: string,
  source: AmplifyAIDocumentBlockSourceInput,
};

export type AmplifyAIDocumentBlockSourceInput = {
  bytes?: string | null,
};

export type AmplifyAIImageBlockInput = {
  format: string,
  source: AmplifyAIImageBlockSourceInput,
};

export type AmplifyAIImageBlockSourceInput = {
  bytes?: string | null,
};

export type AmplifyAIToolResultBlockInput = {
  content: Array< AmplifyAIToolResultContentBlockInput >,
  status?: string | null,
  toolUseId: string,
};

export type AmplifyAIToolResultContentBlockInput = {
  document?: AmplifyAIDocumentBlockInput | null,
  image?: AmplifyAIImageBlockInput | null,
  json?: string | null,
  text?: string | null,
};

export type AmplifyAIToolUseBlockInput = {
  input: string,
  name: string,
  toolUseId: string,
};

export type AmplifyAIToolConfigurationInput = {
  tools?: Array< AmplifyAIToolInput | null > | null,
};

export type AmplifyAIToolInput = {
  toolSpec?: AmplifyAIToolSpecificationInput | null,
};

export type AmplifyAIToolSpecificationInput = {
  description?: string | null,
  inputSchema: AmplifyAIToolInputSchemaInput,
  name: string,
};

export type AmplifyAIToolInputSchemaInput = {
  json?: string | null,
};

export type AmplifyAIConversationMessage = {
  __typename: "AmplifyAIConversationMessage",
  aiContext?: string | null,
  associatedUserMessageId?: string | null,
  content?:  Array<AmplifyAIContentBlock | null > | null,
  conversationId: string,
  createdAt?: string | null,
  id: string,
  owner?: string | null,
  role?: AmplifyAIConversationParticipantRole | null,
  toolConfiguration?: AmplifyAIToolConfiguration | null,
  updatedAt?: string | null,
};

export type ConversationMessageConversationAI = {
  __typename: "ConversationMessageConversationAI",
  aiContext?: string | null,
  associatedUserMessageId?: string | null,
  content?:  Array<AmplifyAIContentBlock | null > | null,
  conversation?: ConversationConversationAI | null,
  conversationId: string,
  createdAt: string,
  id: string,
  owner?: string | null,
  role?: AmplifyAIConversationParticipantRole | null,
  toolConfiguration?: AmplifyAIToolConfiguration | null,
  updatedAt: string,
};

export type AmplifyAIContentBlock = {
  __typename: "AmplifyAIContentBlock",
  document?: AmplifyAIDocumentBlock | null,
  image?: AmplifyAIImageBlock | null,
  text?: string | null,
  toolResult?: AmplifyAIToolResultBlock | null,
  toolUse?: AmplifyAIToolUseBlock | null,
};

export type AmplifyAIDocumentBlock = {
  __typename: "AmplifyAIDocumentBlock",
  format: string,
  name: string,
  source: AmplifyAIDocumentBlockSource,
};

export type AmplifyAIDocumentBlockSource = {
  __typename: "AmplifyAIDocumentBlockSource",
  bytes?: string | null,
};

export type AmplifyAIImageBlock = {
  __typename: "AmplifyAIImageBlock",
  format: string,
  source: AmplifyAIImageBlockSource,
};

export type AmplifyAIImageBlockSource = {
  __typename: "AmplifyAIImageBlockSource",
  bytes?: string | null,
};

export type AmplifyAIToolResultBlock = {
  __typename: "AmplifyAIToolResultBlock",
  content:  Array<AmplifyAIToolResultContentBlock >,
  status?: string | null,
  toolUseId: string,
};

export type AmplifyAIToolResultContentBlock = {
  __typename: "AmplifyAIToolResultContentBlock",
  document?: AmplifyAIDocumentBlock | null,
  image?: AmplifyAIImageBlock | null,
  json?: string | null,
  text?: string | null,
};

export type AmplifyAIToolUseBlock = {
  __typename: "AmplifyAIToolUseBlock",
  input: string,
  name: string,
  toolUseId: string,
};

export type ConversationConversationAI = {
  __typename: "ConversationConversationAI",
  createdAt: string,
  id: string,
  messages?: ModelConversationMessageConversationAIConnection | null,
  metadata?: string | null,
  name?: string | null,
  owner?: string | null,
  updatedAt: string,
};

export type ModelConversationMessageConversationAIConnection = {
  __typename: "ModelConversationMessageConversationAIConnection",
  items:  Array<ConversationMessageConversationAI | null >,
  nextToken?: string | null,
};

export enum AmplifyAIConversationParticipantRole {
  assistant = "assistant",
  user = "user",
}


export type AmplifyAIToolConfiguration = {
  __typename: "AmplifyAIToolConfiguration",
  tools?:  Array<AmplifyAITool | null > | null,
};

export type AmplifyAITool = {
  __typename: "AmplifyAITool",
  toolSpec?: AmplifyAIToolSpecification | null,
};

export type AmplifyAIToolSpecification = {
  __typename: "AmplifyAIToolSpecification",
  description?: string | null,
  inputSchema: AmplifyAIToolInputSchema,
  name: string,
};

export type AmplifyAIToolInputSchema = {
  __typename: "AmplifyAIToolInputSchema",
  json?: string | null,
};

export type CreateConversationMessageConversationAIAssistantInput = {
  associatedUserMessageId?: string | null,
  content?: Array< AmplifyAIContentBlockInput | null > | null,
  conversationId?: string | null,
};

export type CreateConversationMessageConversationAIAssistantStreamingInput = {
  accumulatedTurnContent?: Array< AmplifyAIContentBlockInput | null > | null,
  associatedUserMessageId: string,
  contentBlockDeltaIndex?: number | null,
  contentBlockDoneAtIndex?: number | null,
  contentBlockIndex?: number | null,
  contentBlockText?: string | null,
  contentBlockToolUse?: string | null,
  conversationId: string,
  errors?: Array< AmplifyAIConversationTurnErrorInput | null > | null,
  p?: string | null,
  stopReason?: string | null,
};

export type AmplifyAIConversationTurnErrorInput = {
  errorType: string,
  message: string,
};

export type AmplifyAIConversationMessageStreamPart = {
  __typename: "AmplifyAIConversationMessageStreamPart",
  associatedUserMessageId: string,
  contentBlockDeltaIndex?: number | null,
  contentBlockDoneAtIndex?: number | null,
  contentBlockIndex?: number | null,
  contentBlockText?: string | null,
  contentBlockToolUse?: AmplifyAIToolUseBlock | null,
  conversationId: string,
  errors?:  Array<AmplifyAIConversationTurnError | null > | null,
  id: string,
  owner?: string | null,
  p?: string | null,
  stopReason?: string | null,
};

export type AmplifyAIConversationTurnError = {
  __typename: "AmplifyAIConversationTurnError",
  errorType: string,
  message: string,
};

export type ModelConversationConversationAIConditionInput = {
  and?: Array< ModelConversationConversationAIConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  metadata?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelConversationConversationAIConditionInput | null,
  or?: Array< ModelConversationConversationAIConditionInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type CreateConversationConversationAIInput = {
  id?: string | null,
  metadata?: string | null,
  name?: string | null,
};

export type ModelConversationMessageConversationAIConditionInput = {
  aiContext?: ModelStringInput | null,
  and?: Array< ModelConversationMessageConversationAIConditionInput | null > | null,
  associatedUserMessageId?: ModelIDInput | null,
  conversationId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  not?: ModelConversationMessageConversationAIConditionInput | null,
  or?: Array< ModelConversationMessageConversationAIConditionInput | null > | null,
  owner?: ModelStringInput | null,
  role?: ModelAmplifyAIConversationParticipantRoleInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelAmplifyAIConversationParticipantRoleInput = {
  eq?: AmplifyAIConversationParticipantRole | null,
  ne?: AmplifyAIConversationParticipantRole | null,
};

export type CreateConversationMessageConversationAIInput = {
  aiContext?: string | null,
  associatedUserMessageId?: string | null,
  content?: Array< AmplifyAIContentBlockInput | null > | null,
  conversationId: string,
  id?: string | null,
  role?: AmplifyAIConversationParticipantRole | null,
  toolConfiguration?: AmplifyAIToolConfigurationInput | null,
};

export type ModelSavedRecipeConditionInput = {
  aggregateLikes?: ModelIntInput | null,
  and?: Array< ModelSavedRecipeConditionInput | null > | null,
  cheap?: ModelBooleanInput | null,
  cookingMinutes?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  creditsText?: ModelStringInput | null,
  cuisines?: ModelStringInput | null,
  dairyFree?: ModelBooleanInput | null,
  diets?: ModelStringInput | null,
  dishTypes?: ModelStringInput | null,
  gaps?: ModelStringInput | null,
  glutenFree?: ModelBooleanInput | null,
  healthScore?: ModelFloatInput | null,
  image?: ModelStringInput | null,
  instructions?: ModelStringInput | null,
  license?: ModelStringInput | null,
  lowFodmap?: ModelBooleanInput | null,
  not?: ModelSavedRecipeConditionInput | null,
  occasions?: ModelStringInput | null,
  or?: Array< ModelSavedRecipeConditionInput | null > | null,
  preparationMinutes?: ModelIntInput | null,
  pricePerServing?: ModelFloatInput | null,
  readyInMinutes?: ModelIntInput | null,
  recipeId?: ModelStringInput | null,
  servings?: ModelIntInput | null,
  sourceName?: ModelStringInput | null,
  summary?: ModelStringInput | null,
  sustainable?: ModelBooleanInput | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  vegan?: ModelBooleanInput | null,
  vegetarian?: ModelBooleanInput | null,
  veryHealthy?: ModelBooleanInput | null,
  veryPopular?: ModelBooleanInput | null,
  weightWatcherSmartPoints?: ModelIntInput | null,
};

export type ModelIntInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelFloatInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type CreateSavedRecipeInput = {
  aggregateLikes?: number | null,
  cheap?: boolean | null,
  cookingMinutes?: number | null,
  createdAt?: string | null,
  creditsText?: string | null,
  cuisines?: Array< string | null > | null,
  dairyFree?: boolean | null,
  diets?: Array< string | null > | null,
  dishTypes?: Array< string | null > | null,
  gaps?: string | null,
  glutenFree?: boolean | null,
  healthScore?: number | null,
  id?: string | null,
  image?: string | null,
  instructions?: string | null,
  license?: string | null,
  lowFodmap?: boolean | null,
  occasions?: Array< string | null > | null,
  preparationMinutes?: number | null,
  pricePerServing?: number | null,
  readyInMinutes?: number | null,
  recipeId?: string | null,
  servings?: number | null,
  simplifiedInstructions?: Array< SimplifiedInstructionsInput | null > | null,
  sourceName?: string | null,
  summary?: string | null,
  sustainable?: boolean | null,
  title?: string | null,
  updatedAt?: string | null,
  userId?: string | null,
  vegan?: boolean | null,
  vegetarian?: boolean | null,
  veryHealthy?: boolean | null,
  veryPopular?: boolean | null,
  weightWatcherSmartPoints?: number | null,
};

export type SimplifiedInstructionsInput = {
  ingredients?: Array< string | null > | null,
  number?: number | null,
  step?: string | null,
};

export type ModelUserProfileConditionInput = {
  allergies?: ModelStringInput | null,
  and?: Array< ModelUserProfileConditionInput | null > | null,
  createdAt?: ModelStringInput | null,
  diet?: ModelStringInput | null,
  dietaryPreferences?: ModelStringInput | null,
  dislikedFoods?: ModelStringInput | null,
  email?: ModelStringInput | null,
  intolerances?: ModelStringInput | null,
  likedFoods?: ModelStringInput | null,
  not?: ModelUserProfileConditionInput | null,
  or?: Array< ModelUserProfileConditionInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
  username?: ModelStringInput | null,
};

export type CreateUserProfileInput = {
  allergies?: string | null,
  createdAt?: string | null,
  diet?: string | null,
  dietaryPreferences?: string | null,
  dislikedFoods?: string | null,
  email?: string | null,
  id?: string | null,
  intolerances?: string | null,
  likedFoods?: string | null,
  updatedAt?: string | null,
  userId?: string | null,
  username?: string | null,
};

export type DeleteConversationConversationAIInput = {
  id: string,
};

export type DeleteConversationMessageConversationAIInput = {
  id: string,
};

export type DeleteSavedRecipeInput = {
  id: string,
};

export type DeleteUserProfileInput = {
  id: string,
};

export type UpdateConversationConversationAIInput = {
  id: string,
  metadata?: string | null,
  name?: string | null,
};

export type UpdateSavedRecipeInput = {
  aggregateLikes?: number | null,
  cheap?: boolean | null,
  cookingMinutes?: number | null,
  createdAt?: string | null,
  creditsText?: string | null,
  cuisines?: Array< string | null > | null,
  dairyFree?: boolean | null,
  diets?: Array< string | null > | null,
  dishTypes?: Array< string | null > | null,
  gaps?: string | null,
  glutenFree?: boolean | null,
  healthScore?: number | null,
  id: string,
  image?: string | null,
  instructions?: string | null,
  license?: string | null,
  lowFodmap?: boolean | null,
  occasions?: Array< string | null > | null,
  preparationMinutes?: number | null,
  pricePerServing?: number | null,
  readyInMinutes?: number | null,
  recipeId?: string | null,
  servings?: number | null,
  simplifiedInstructions?: Array< SimplifiedInstructionsInput | null > | null,
  sourceName?: string | null,
  summary?: string | null,
  sustainable?: boolean | null,
  title?: string | null,
  updatedAt?: string | null,
  userId?: string | null,
  vegan?: boolean | null,
  vegetarian?: boolean | null,
  veryHealthy?: boolean | null,
  veryPopular?: boolean | null,
  weightWatcherSmartPoints?: number | null,
};

export type UpdateUserProfileInput = {
  allergies?: string | null,
  createdAt?: string | null,
  diet?: string | null,
  dietaryPreferences?: string | null,
  dislikedFoods?: string | null,
  email?: string | null,
  id: string,
  intolerances?: string | null,
  likedFoods?: string | null,
  updatedAt?: string | null,
  userId?: string | null,
  username?: string | null,
};

export type SpoonacularGetRecipePathParametersInput = {
  path_id?: number | null,
};

export type SpoonacularGetRecipeQueryStringParametersInput = {
  addRecipeInformation?: boolean | null,
  addRecipeNutrition?: boolean | null,
  author?: string | null,
  diet?: SpoonacularGetRecipeQueryStringParametersDiet | null,
  excludeIngredients?: string | null,
  fillIngredients?: boolean | null,
  ignorePantry?: boolean | null,
  includeIngredients?: string | null,
  instructionsRequired?: boolean | null,
  intolerances?: SpoonacularGetRecipeQueryStringParametersIntolerances | null,
  maxCalories?: number | null,
  maxCarbs?: number | null,
  maxProtein?: number | null,
  maxReadyTime?: number | null,
  minCalories?: number | null,
  minCarbs?: number | null,
  minProtein?: number | null,
  number?: number | null,
  offset?: number | null,
  query?: string | null,
  recipeBoxId?: number | null,
  sort?: SpoonacularGetRecipeQueryStringParametersSort | null,
  sortDirection?: SpoonacularGetRecipeQueryStringParametersSortDirection | null,
  tags?: string | null,
  titleMatch?: string | null,
  type?: SpoonacularGetRecipeQueryStringParametersType | null,
};

export enum SpoonacularGetRecipeQueryStringParametersDiet {
  Gluten_Free = "Gluten_Free",
  Ketogenic = "Ketogenic",
  Lacto_Vegetarian = "Lacto_Vegetarian",
  Ovo_Vegetarian = "Ovo_Vegetarian",
  Paleo = "Paleo",
  Pescetarian = "Pescetarian",
  Primal = "Primal",
  Vegan = "Vegan",
  Vegetarian = "Vegetarian",
  Whole30 = "Whole30",
}


export enum SpoonacularGetRecipeQueryStringParametersIntolerances {
  Dairy = "Dairy",
  Egg = "Egg",
  Fish = "Fish",
  Peanut = "Peanut",
  Shellfish = "Shellfish",
  Soy = "Soy",
  Wheat = "Wheat",
}


export enum SpoonacularGetRecipeQueryStringParametersSort {
  healthiness = "healthiness",
  popularity = "popularity",
  price = "price",
  random = "random",
  sustainability = "sustainability",
  time = "time",
}


export enum SpoonacularGetRecipeQueryStringParametersSortDirection {
  asc = "asc",
  desc = "desc",
}


export enum SpoonacularGetRecipeQueryStringParametersType {
  appetizer = "appetizer",
  beverage = "beverage",
  bread = "bread",
  breakfast = "breakfast",
  dessert = "dessert",
  drink = "drink",
  fingerfood = "fingerfood",
  main_course = "main_course",
  marinade = "marinade",
  salad = "salad",
  sauce = "sauce",
  side_dish = "side_dish",
  snack = "snack",
  soup = "soup",
}


export type ModelConversationConversationAIFilterInput = {
  and?: Array< ModelConversationConversationAIFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  metadata?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelConversationConversationAIFilterInput | null,
  or?: Array< ModelConversationConversationAIFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelConversationConversationAIConnection = {
  __typename: "ModelConversationConversationAIConnection",
  items:  Array<ConversationConversationAI | null >,
  nextToken?: string | null,
};

export type ModelConversationMessageConversationAIFilterInput = {
  aiContext?: ModelStringInput | null,
  and?: Array< ModelConversationMessageConversationAIFilterInput | null > | null,
  associatedUserMessageId?: ModelIDInput | null,
  conversationId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelConversationMessageConversationAIFilterInput | null,
  or?: Array< ModelConversationMessageConversationAIFilterInput | null > | null,
  owner?: ModelStringInput | null,
  role?: ModelAmplifyAIConversationParticipantRoleInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelSavedRecipeFilterInput = {
  aggregateLikes?: ModelIntInput | null,
  and?: Array< ModelSavedRecipeFilterInput | null > | null,
  cheap?: ModelBooleanInput | null,
  cookingMinutes?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  creditsText?: ModelStringInput | null,
  cuisines?: ModelStringInput | null,
  dairyFree?: ModelBooleanInput | null,
  diets?: ModelStringInput | null,
  dishTypes?: ModelStringInput | null,
  gaps?: ModelStringInput | null,
  glutenFree?: ModelBooleanInput | null,
  healthScore?: ModelFloatInput | null,
  id?: ModelIDInput | null,
  image?: ModelStringInput | null,
  instructions?: ModelStringInput | null,
  license?: ModelStringInput | null,
  lowFodmap?: ModelBooleanInput | null,
  not?: ModelSavedRecipeFilterInput | null,
  occasions?: ModelStringInput | null,
  or?: Array< ModelSavedRecipeFilterInput | null > | null,
  preparationMinutes?: ModelIntInput | null,
  pricePerServing?: ModelFloatInput | null,
  readyInMinutes?: ModelIntInput | null,
  recipeId?: ModelStringInput | null,
  servings?: ModelIntInput | null,
  sourceName?: ModelStringInput | null,
  summary?: ModelStringInput | null,
  sustainable?: ModelBooleanInput | null,
  title?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  vegan?: ModelBooleanInput | null,
  vegetarian?: ModelBooleanInput | null,
  veryHealthy?: ModelBooleanInput | null,
  veryPopular?: ModelBooleanInput | null,
  weightWatcherSmartPoints?: ModelIntInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserProfileFilterInput = {
  allergies?: ModelStringInput | null,
  and?: Array< ModelUserProfileFilterInput | null > | null,
  createdAt?: ModelStringInput | null,
  diet?: ModelStringInput | null,
  dietaryPreferences?: ModelStringInput | null,
  dislikedFoods?: ModelStringInput | null,
  email?: ModelStringInput | null,
  id?: ModelIDInput | null,
  intolerances?: ModelStringInput | null,
  likedFoods?: ModelStringInput | null,
  not?: ModelUserProfileFilterInput | null,
  or?: Array< ModelUserProfileFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelStringInput | null,
  username?: ModelStringInput | null,
};

export type ModelUserProfileConnection = {
  __typename: "ModelUserProfileConnection",
  items:  Array<UserProfile | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionConversationMessageConversationAIFilterInput = {
  aiContext?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionConversationMessageConversationAIFilterInput | null > | null,
  associatedUserMessageId?: ModelSubscriptionIDInput | null,
  conversationId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionConversationMessageConversationAIFilterInput | null > | null,
  owner?: ModelStringInput | null,
  role?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionSavedRecipeFilterInput = {
  aggregateLikes?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionSavedRecipeFilterInput | null > | null,
  cheap?: ModelSubscriptionBooleanInput | null,
  cookingMinutes?: ModelSubscriptionIntInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  creditsText?: ModelSubscriptionStringInput | null,
  cuisines?: ModelSubscriptionStringInput | null,
  dairyFree?: ModelSubscriptionBooleanInput | null,
  diets?: ModelSubscriptionStringInput | null,
  dishTypes?: ModelSubscriptionStringInput | null,
  gaps?: ModelSubscriptionStringInput | null,
  glutenFree?: ModelSubscriptionBooleanInput | null,
  healthScore?: ModelSubscriptionFloatInput | null,
  id?: ModelSubscriptionIDInput | null,
  image?: ModelSubscriptionStringInput | null,
  instructions?: ModelSubscriptionStringInput | null,
  license?: ModelSubscriptionStringInput | null,
  lowFodmap?: ModelSubscriptionBooleanInput | null,
  occasions?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionSavedRecipeFilterInput | null > | null,
  preparationMinutes?: ModelSubscriptionIntInput | null,
  pricePerServing?: ModelSubscriptionFloatInput | null,
  readyInMinutes?: ModelSubscriptionIntInput | null,
  recipeId?: ModelSubscriptionStringInput | null,
  servings?: ModelSubscriptionIntInput | null,
  sourceName?: ModelSubscriptionStringInput | null,
  summary?: ModelSubscriptionStringInput | null,
  sustainable?: ModelSubscriptionBooleanInput | null,
  title?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
  vegan?: ModelSubscriptionBooleanInput | null,
  vegetarian?: ModelSubscriptionBooleanInput | null,
  veryHealthy?: ModelSubscriptionBooleanInput | null,
  veryPopular?: ModelSubscriptionBooleanInput | null,
  weightWatcherSmartPoints?: ModelSubscriptionIntInput | null,
};

export type ModelSubscriptionIntInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelSubscriptionFloatInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  in?: Array< number | null > | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionUserProfileFilterInput = {
  allergies?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserProfileFilterInput | null > | null,
  createdAt?: ModelSubscriptionStringInput | null,
  diet?: ModelSubscriptionStringInput | null,
  dietaryPreferences?: ModelSubscriptionStringInput | null,
  dislikedFoods?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  intolerances?: ModelSubscriptionStringInput | null,
  likedFoods?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionUserProfileFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionStringInput | null,
  username?: ModelSubscriptionStringInput | null,
};

export type SaveFavoriteRecipeMutationVariables = {
  image?: string | null,
  recipeId: string,
  title: string,
  userId: string,
};

export type SaveFavoriteRecipeMutation = {
  SaveFavoriteRecipe?:  {
    __typename: "SavedRecipe",
    aggregateLikes?: number | null,
    cheap?: boolean | null,
    cookingMinutes?: number | null,
    createdAt?: string | null,
    creditsText?: string | null,
    cuisines?: Array< string | null > | null,
    dairyFree?: boolean | null,
    diets?: Array< string | null > | null,
    dishTypes?: Array< string | null > | null,
    gaps?: string | null,
    glutenFree?: boolean | null,
    healthScore?: number | null,
    id: string,
    image?: string | null,
    instructions?: string | null,
    license?: string | null,
    lowFodmap?: boolean | null,
    occasions?: Array< string | null > | null,
    preparationMinutes?: number | null,
    pricePerServing?: number | null,
    readyInMinutes?: number | null,
    recipeId?: string | null,
    servings?: number | null,
    simplifiedInstructions?:  Array< {
      __typename: "simplifiedInstructions",
      ingredients?: Array< string | null > | null,
      number?: number | null,
      step?: string | null,
    } | null > | null,
    sourceName?: string | null,
    summary?: string | null,
    sustainable?: boolean | null,
    title?: string | null,
    updatedAt?: string | null,
    userId?: string | null,
    userProfile?:  {
      __typename: "UserProfile",
      allergies?: string | null,
      createdAt?: string | null,
      diet?: string | null,
      dietaryPreferences?: string | null,
      dislikedFoods?: string | null,
      email?: string | null,
      id: string,
      intolerances?: string | null,
      likedFoods?: string | null,
      owner?: string | null,
      updatedAt?: string | null,
      userId?: string | null,
      username?: string | null,
    } | null,
    vegan?: boolean | null,
    vegetarian?: boolean | null,
    veryHealthy?: boolean | null,
    veryPopular?: boolean | null,
    weightWatcherSmartPoints?: number | null,
  } | null,
};

export type ConversationAIMutationVariables = {
  aiContext?: string | null,
  content?: Array< AmplifyAIContentBlockInput | null > | null,
  conversationId: string,
  toolConfiguration?: AmplifyAIToolConfigurationInput | null,
};

export type ConversationAIMutation = {
  conversationAI: ( {
      __typename: "ConversationMessageConversationAI",
      aiContext?: string | null,
      associatedUserMessageId?: string | null,
      content?:  Array< {
        __typename: "AmplifyAIContentBlock",
        text?: string | null,
      } | null > | null,
      conversationId: string,
      createdAt?: string | null,
      id: string,
      owner?: string | null,
      role?: AmplifyAIConversationParticipantRole | null,
      toolConfiguration?:  {
        __typename: "AmplifyAIToolConfiguration",
      } | null,
      updatedAt?: string | null,
      conversation?:  {
        __typename: "ConversationConversationAI",
        createdAt: string,
        id: string,
        metadata?: string | null,
        name?: string | null,
        owner?: string | null,
        updatedAt: string,
      } | null,
    }
  ) | null,
};

export type CreateAssistantResponseConversationAIMutationVariables = {
  input: CreateConversationMessageConversationAIAssistantInput,
};

export type CreateAssistantResponseConversationAIMutation = {
  createAssistantResponseConversationAI?:  {
    __typename: "ConversationMessageConversationAI",
    aiContext?: string | null,
    associatedUserMessageId?: string | null,
    content?:  Array< {
      __typename: "AmplifyAIContentBlock",
      text?: string | null,
    } | null > | null,
    conversation?:  {
      __typename: "ConversationConversationAI",
      createdAt: string,
      id: string,
      metadata?: string | null,
      name?: string | null,
      owner?: string | null,
      updatedAt: string,
    } | null,
    conversationId: string,
    createdAt: string,
    id: string,
    owner?: string | null,
    role?: AmplifyAIConversationParticipantRole | null,
    toolConfiguration?:  {
      __typename: "AmplifyAIToolConfiguration",
    } | null,
    updatedAt: string,
  } | null,
};

export type CreateAssistantResponseStreamConversationAIMutationVariables = {
  input: CreateConversationMessageConversationAIAssistantStreamingInput,
};

export type CreateAssistantResponseStreamConversationAIMutation = {
  createAssistantResponseStreamConversationAI?:  {
    __typename: "AmplifyAIConversationMessageStreamPart",
    associatedUserMessageId: string,
    contentBlockDeltaIndex?: number | null,
    contentBlockDoneAtIndex?: number | null,
    contentBlockIndex?: number | null,
    contentBlockText?: string | null,
    contentBlockToolUse?:  {
      __typename: "AmplifyAIToolUseBlock",
      input: string,
      name: string,
      toolUseId: string,
    } | null,
    conversationId: string,
    errors?:  Array< {
      __typename: "AmplifyAIConversationTurnError",
      errorType: string,
      message: string,
    } | null > | null,
    id: string,
    owner?: string | null,
    p?: string | null,
    stopReason?: string | null,
  } | null,
};

export type CreateConversationConversationAIMutationVariables = {
  condition?: ModelConversationConversationAIConditionInput | null,
  input: CreateConversationConversationAIInput,
};

export type CreateConversationConversationAIMutation = {
  createConversationConversationAI?:  {
    __typename: "ConversationConversationAI",
    createdAt: string,
    id: string,
    messages?:  {
      __typename: "ModelConversationMessageConversationAIConnection",
      nextToken?: string | null,
    } | null,
    metadata?: string | null,
    name?: string | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateConversationMessageConversationAIMutationVariables = {
  condition?: ModelConversationMessageConversationAIConditionInput | null,
  input: CreateConversationMessageConversationAIInput,
};

export type CreateConversationMessageConversationAIMutation = {
  createConversationMessageConversationAI?:  {
    __typename: "ConversationMessageConversationAI",
    aiContext?: string | null,
    associatedUserMessageId?: string | null,
    content?:  Array< {
      __typename: "AmplifyAIContentBlock",
      text?: string | null,
    } | null > | null,
    conversation?:  {
      __typename: "ConversationConversationAI",
      createdAt: string,
      id: string,
      metadata?: string | null,
      name?: string | null,
      owner?: string | null,
      updatedAt: string,
    } | null,
    conversationId: string,
    createdAt: string,
    id: string,
    owner?: string | null,
    role?: AmplifyAIConversationParticipantRole | null,
    toolConfiguration?:  {
      __typename: "AmplifyAIToolConfiguration",
    } | null,
    updatedAt: string,
  } | null,
};

export type CreateSavedRecipeMutationVariables = {
  condition?: ModelSavedRecipeConditionInput | null,
  input: CreateSavedRecipeInput,
};

export type CreateSavedRecipeMutation = {
  createSavedRecipe?:  {
    __typename: "SavedRecipe",
    aggregateLikes?: number | null,
    cheap?: boolean | null,
    cookingMinutes?: number | null,
    createdAt?: string | null,
    creditsText?: string | null,
    cuisines?: Array< string | null > | null,
    dairyFree?: boolean | null,
    diets?: Array< string | null > | null,
    dishTypes?: Array< string | null > | null,
    gaps?: string | null,
    glutenFree?: boolean | null,
    healthScore?: number | null,
    id: string,
    image?: string | null,
    instructions?: string | null,
    license?: string | null,
    lowFodmap?: boolean | null,
    occasions?: Array< string | null > | null,
    preparationMinutes?: number | null,
    pricePerServing?: number | null,
    readyInMinutes?: number | null,
    recipeId?: string | null,
    servings?: number | null,
    simplifiedInstructions?:  Array< {
      __typename: "simplifiedInstructions",
      ingredients?: Array< string | null > | null,
      number?: number | null,
      step?: string | null,
    } | null > | null,
    sourceName?: string | null,
    summary?: string | null,
    sustainable?: boolean | null,
    title?: string | null,
    updatedAt?: string | null,
    userId?: string | null,
    userProfile?:  {
      __typename: "UserProfile",
      allergies?: string | null,
      createdAt?: string | null,
      diet?: string | null,
      dietaryPreferences?: string | null,
      dislikedFoods?: string | null,
      email?: string | null,
      id: string,
      intolerances?: string | null,
      likedFoods?: string | null,
      owner?: string | null,
      updatedAt?: string | null,
      userId?: string | null,
      username?: string | null,
    } | null,
    vegan?: boolean | null,
    vegetarian?: boolean | null,
    veryHealthy?: boolean | null,
    veryPopular?: boolean | null,
    weightWatcherSmartPoints?: number | null,
  } | null,
};

export type CreateUserProfileMutationVariables = {
  condition?: ModelUserProfileConditionInput | null,
  input: CreateUserProfileInput,
};

export type CreateUserProfileMutation = {
  createUserProfile?:  {
    __typename: "UserProfile",
    allergies?: string | null,
    createdAt?: string | null,
    diet?: string | null,
    dietaryPreferences?: string | null,
    dislikedFoods?: string | null,
    email?: string | null,
    id: string,
    intolerances?: string | null,
    likedFoods?: string | null,
    owner?: string | null,
    savedRecipes?:  {
      __typename: "ModelSavedRecipeConnection",
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    userId?: string | null,
    username?: string | null,
  } | null,
};

export type DeleteConversationConversationAIMutationVariables = {
  condition?: ModelConversationConversationAIConditionInput | null,
  input: DeleteConversationConversationAIInput,
};

export type DeleteConversationConversationAIMutation = {
  deleteConversationConversationAI?:  {
    __typename: "ConversationConversationAI",
    createdAt: string,
    id: string,
    messages?:  {
      __typename: "ModelConversationMessageConversationAIConnection",
      nextToken?: string | null,
    } | null,
    metadata?: string | null,
    name?: string | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteConversationMessageConversationAIMutationVariables = {
  condition?: ModelConversationMessageConversationAIConditionInput | null,
  input: DeleteConversationMessageConversationAIInput,
};

export type DeleteConversationMessageConversationAIMutation = {
  deleteConversationMessageConversationAI?:  {
    __typename: "ConversationMessageConversationAI",
    aiContext?: string | null,
    associatedUserMessageId?: string | null,
    content?:  Array< {
      __typename: "AmplifyAIContentBlock",
      text?: string | null,
    } | null > | null,
    conversation?:  {
      __typename: "ConversationConversationAI",
      createdAt: string,
      id: string,
      metadata?: string | null,
      name?: string | null,
      owner?: string | null,
      updatedAt: string,
    } | null,
    conversationId: string,
    createdAt: string,
    id: string,
    owner?: string | null,
    role?: AmplifyAIConversationParticipantRole | null,
    toolConfiguration?:  {
      __typename: "AmplifyAIToolConfiguration",
    } | null,
    updatedAt: string,
  } | null,
};

export type DeleteSavedRecipeMutationVariables = {
  condition?: ModelSavedRecipeConditionInput | null,
  input: DeleteSavedRecipeInput,
};

export type DeleteSavedRecipeMutation = {
  deleteSavedRecipe?:  {
    __typename: "SavedRecipe",
    aggregateLikes?: number | null,
    cheap?: boolean | null,
    cookingMinutes?: number | null,
    createdAt?: string | null,
    creditsText?: string | null,
    cuisines?: Array< string | null > | null,
    dairyFree?: boolean | null,
    diets?: Array< string | null > | null,
    dishTypes?: Array< string | null > | null,
    gaps?: string | null,
    glutenFree?: boolean | null,
    healthScore?: number | null,
    id: string,
    image?: string | null,
    instructions?: string | null,
    license?: string | null,
    lowFodmap?: boolean | null,
    occasions?: Array< string | null > | null,
    preparationMinutes?: number | null,
    pricePerServing?: number | null,
    readyInMinutes?: number | null,
    recipeId?: string | null,
    servings?: number | null,
    simplifiedInstructions?:  Array< {
      __typename: "simplifiedInstructions",
      ingredients?: Array< string | null > | null,
      number?: number | null,
      step?: string | null,
    } | null > | null,
    sourceName?: string | null,
    summary?: string | null,
    sustainable?: boolean | null,
    title?: string | null,
    updatedAt?: string | null,
    userId?: string | null,
    userProfile?:  {
      __typename: "UserProfile",
      allergies?: string | null,
      createdAt?: string | null,
      diet?: string | null,
      dietaryPreferences?: string | null,
      dislikedFoods?: string | null,
      email?: string | null,
      id: string,
      intolerances?: string | null,
      likedFoods?: string | null,
      owner?: string | null,
      updatedAt?: string | null,
      userId?: string | null,
      username?: string | null,
    } | null,
    vegan?: boolean | null,
    vegetarian?: boolean | null,
    veryHealthy?: boolean | null,
    veryPopular?: boolean | null,
    weightWatcherSmartPoints?: number | null,
  } | null,
};

export type DeleteUserProfileMutationVariables = {
  condition?: ModelUserProfileConditionInput | null,
  input: DeleteUserProfileInput,
};

export type DeleteUserProfileMutation = {
  deleteUserProfile?:  {
    __typename: "UserProfile",
    allergies?: string | null,
    createdAt?: string | null,
    diet?: string | null,
    dietaryPreferences?: string | null,
    dislikedFoods?: string | null,
    email?: string | null,
    id: string,
    intolerances?: string | null,
    likedFoods?: string | null,
    owner?: string | null,
    savedRecipes?:  {
      __typename: "ModelSavedRecipeConnection",
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    userId?: string | null,
    username?: string | null,
  } | null,
};

export type UpdateConversationConversationAIMutationVariables = {
  condition?: ModelConversationConversationAIConditionInput | null,
  input: UpdateConversationConversationAIInput,
};

export type UpdateConversationConversationAIMutation = {
  updateConversationConversationAI?:  {
    __typename: "ConversationConversationAI",
    createdAt: string,
    id: string,
    messages?:  {
      __typename: "ModelConversationMessageConversationAIConnection",
      nextToken?: string | null,
    } | null,
    metadata?: string | null,
    name?: string | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateSavedRecipeMutationVariables = {
  condition?: ModelSavedRecipeConditionInput | null,
  input: UpdateSavedRecipeInput,
};

export type UpdateSavedRecipeMutation = {
  updateSavedRecipe?:  {
    __typename: "SavedRecipe",
    aggregateLikes?: number | null,
    cheap?: boolean | null,
    cookingMinutes?: number | null,
    createdAt?: string | null,
    creditsText?: string | null,
    cuisines?: Array< string | null > | null,
    dairyFree?: boolean | null,
    diets?: Array< string | null > | null,
    dishTypes?: Array< string | null > | null,
    gaps?: string | null,
    glutenFree?: boolean | null,
    healthScore?: number | null,
    id: string,
    image?: string | null,
    instructions?: string | null,
    license?: string | null,
    lowFodmap?: boolean | null,
    occasions?: Array< string | null > | null,
    preparationMinutes?: number | null,
    pricePerServing?: number | null,
    readyInMinutes?: number | null,
    recipeId?: string | null,
    servings?: number | null,
    simplifiedInstructions?:  Array< {
      __typename: "simplifiedInstructions",
      ingredients?: Array< string | null > | null,
      number?: number | null,
      step?: string | null,
    } | null > | null,
    sourceName?: string | null,
    summary?: string | null,
    sustainable?: boolean | null,
    title?: string | null,
    updatedAt?: string | null,
    userId?: string | null,
    userProfile?:  {
      __typename: "UserProfile",
      allergies?: string | null,
      createdAt?: string | null,
      diet?: string | null,
      dietaryPreferences?: string | null,
      dislikedFoods?: string | null,
      email?: string | null,
      id: string,
      intolerances?: string | null,
      likedFoods?: string | null,
      owner?: string | null,
      updatedAt?: string | null,
      userId?: string | null,
      username?: string | null,
    } | null,
    vegan?: boolean | null,
    vegetarian?: boolean | null,
    veryHealthy?: boolean | null,
    veryPopular?: boolean | null,
    weightWatcherSmartPoints?: number | null,
  } | null,
};

export type UpdateUserProfileMutationVariables = {
  condition?: ModelUserProfileConditionInput | null,
  input: UpdateUserProfileInput,
};

export type UpdateUserProfileMutation = {
  updateUserProfile?:  {
    __typename: "UserProfile",
    allergies?: string | null,
    createdAt?: string | null,
    diet?: string | null,
    dietaryPreferences?: string | null,
    dislikedFoods?: string | null,
    email?: string | null,
    id: string,
    intolerances?: string | null,
    likedFoods?: string | null,
    owner?: string | null,
    savedRecipes?:  {
      __typename: "ModelSavedRecipeConnection",
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    userId?: string | null,
    username?: string | null,
  } | null,
};

export type SpoonacularGetRecipeQueryVariables = {
  httpMethod: string,
  path: string,
  pathParameters?: SpoonacularGetRecipePathParametersInput | null,
  queryStringParameters?: SpoonacularGetRecipeQueryStringParametersInput | null,
};

export type SpoonacularGetRecipeQuery = {
  SpoonacularGetRecipe?: string | null,
};

export type GetConversationConversationAIQueryVariables = {
  id: string,
};

export type GetConversationConversationAIQuery = {
  getConversationConversationAI?:  {
    __typename: "ConversationConversationAI",
    createdAt: string,
    id: string,
    messages?:  {
      __typename: "ModelConversationMessageConversationAIConnection",
      nextToken?: string | null,
    } | null,
    metadata?: string | null,
    name?: string | null,
    owner?: string | null,
    updatedAt: string,
  } | null,
};

export type GetConversationMessageConversationAIQueryVariables = {
  id: string,
};

export type GetConversationMessageConversationAIQuery = {
  getConversationMessageConversationAI?:  {
    __typename: "ConversationMessageConversationAI",
    aiContext?: string | null,
    associatedUserMessageId?: string | null,
    content?:  Array< {
      __typename: "AmplifyAIContentBlock",
      text?: string | null,
    } | null > | null,
    conversation?:  {
      __typename: "ConversationConversationAI",
      createdAt: string,
      id: string,
      metadata?: string | null,
      name?: string | null,
      owner?: string | null,
      updatedAt: string,
    } | null,
    conversationId: string,
    createdAt: string,
    id: string,
    owner?: string | null,
    role?: AmplifyAIConversationParticipantRole | null,
    toolConfiguration?:  {
      __typename: "AmplifyAIToolConfiguration",
    } | null,
    updatedAt: string,
  } | null,
};

export type GetSavedRecipeQueryVariables = {
  id: string,
};

export type GetSavedRecipeQuery = {
  getSavedRecipe?:  {
    __typename: "SavedRecipe",
    aggregateLikes?: number | null,
    cheap?: boolean | null,
    cookingMinutes?: number | null,
    createdAt?: string | null,
    creditsText?: string | null,
    cuisines?: Array< string | null > | null,
    dairyFree?: boolean | null,
    diets?: Array< string | null > | null,
    dishTypes?: Array< string | null > | null,
    gaps?: string | null,
    glutenFree?: boolean | null,
    healthScore?: number | null,
    id: string,
    image?: string | null,
    instructions?: string | null,
    license?: string | null,
    lowFodmap?: boolean | null,
    occasions?: Array< string | null > | null,
    preparationMinutes?: number | null,
    pricePerServing?: number | null,
    readyInMinutes?: number | null,
    recipeId?: string | null,
    servings?: number | null,
    simplifiedInstructions?:  Array< {
      __typename: "simplifiedInstructions",
      ingredients?: Array< string | null > | null,
      number?: number | null,
      step?: string | null,
    } | null > | null,
    sourceName?: string | null,
    summary?: string | null,
    sustainable?: boolean | null,
    title?: string | null,
    updatedAt?: string | null,
    userId?: string | null,
    userProfile?:  {
      __typename: "UserProfile",
      allergies?: string | null,
      createdAt?: string | null,
      diet?: string | null,
      dietaryPreferences?: string | null,
      dislikedFoods?: string | null,
      email?: string | null,
      id: string,
      intolerances?: string | null,
      likedFoods?: string | null,
      owner?: string | null,
      updatedAt?: string | null,
      userId?: string | null,
      username?: string | null,
    } | null,
    vegan?: boolean | null,
    vegetarian?: boolean | null,
    veryHealthy?: boolean | null,
    veryPopular?: boolean | null,
    weightWatcherSmartPoints?: number | null,
  } | null,
};

export type GetUserProfileQueryVariables = {
  id: string,
};

export type GetUserProfileQuery = {
  getUserProfile?:  {
    __typename: "UserProfile",
    allergies?: string | null,
    createdAt?: string | null,
    diet?: string | null,
    dietaryPreferences?: string | null,
    dislikedFoods?: string | null,
    email?: string | null,
    id: string,
    intolerances?: string | null,
    likedFoods?: string | null,
    owner?: string | null,
    savedRecipes?:  {
      __typename: "ModelSavedRecipeConnection",
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    userId?: string | null,
    username?: string | null,
  } | null,
};

export type ListConversationConversationAISQueryVariables = {
  filter?: ModelConversationConversationAIFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListConversationConversationAISQuery = {
  listConversationConversationAIS?:  {
    __typename: "ModelConversationConversationAIConnection",
    items:  Array< {
      __typename: "ConversationConversationAI",
      createdAt: string,
      id: string,
      metadata?: string | null,
      name?: string | null,
      owner?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListConversationMessageConversationAISQueryVariables = {
  filter?: ModelConversationMessageConversationAIFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListConversationMessageConversationAISQuery = {
  listConversationMessageConversationAIS?:  {
    __typename: "ModelConversationMessageConversationAIConnection",
    items:  Array< {
      __typename: "ConversationMessageConversationAI",
      aiContext?: string | null,
      associatedUserMessageId?: string | null,
      conversationId: string,
      createdAt: string,
      id: string,
      owner?: string | null,
      role?: AmplifyAIConversationParticipantRole | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSavedRecipeByUserIdQueryVariables = {
  filter?: ModelSavedRecipeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
  userId: string,
};

export type ListSavedRecipeByUserIdQuery = {
  listSavedRecipeByUserId?:  {
    __typename: "ModelSavedRecipeConnection",
    items:  Array< {
      __typename: "SavedRecipe",
      aggregateLikes?: number | null,
      cheap?: boolean | null,
      cookingMinutes?: number | null,
      createdAt?: string | null,
      creditsText?: string | null,
      cuisines?: Array< string | null > | null,
      dairyFree?: boolean | null,
      diets?: Array< string | null > | null,
      dishTypes?: Array< string | null > | null,
      gaps?: string | null,
      glutenFree?: boolean | null,
      healthScore?: number | null,
      id: string,
      image?: string | null,
      instructions?: string | null,
      license?: string | null,
      lowFodmap?: boolean | null,
      occasions?: Array< string | null > | null,
      preparationMinutes?: number | null,
      pricePerServing?: number | null,
      readyInMinutes?: number | null,
      recipeId?: string | null,
      servings?: number | null,
      sourceName?: string | null,
      summary?: string | null,
      sustainable?: boolean | null,
      title?: string | null,
      updatedAt?: string | null,
      userId?: string | null,
      vegan?: boolean | null,
      vegetarian?: boolean | null,
      veryHealthy?: boolean | null,
      veryPopular?: boolean | null,
      weightWatcherSmartPoints?: number | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListSavedRecipesQueryVariables = {
  filter?: ModelSavedRecipeFilterInput | null,
  id?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListSavedRecipesQuery = {
  listSavedRecipes?:  {
    __typename: "ModelSavedRecipeConnection",
    items:  Array< {
      __typename: "SavedRecipe",
      aggregateLikes?: number | null,
      cheap?: boolean | null,
      cookingMinutes?: number | null,
      createdAt?: string | null,
      creditsText?: string | null,
      cuisines?: Array< string | null > | null,
      dairyFree?: boolean | null,
      diets?: Array< string | null > | null,
      dishTypes?: Array< string | null > | null,
      gaps?: string | null,
      glutenFree?: boolean | null,
      healthScore?: number | null,
      id: string,
      image?: string | null,
      instructions?: string | null,
      license?: string | null,
      lowFodmap?: boolean | null,
      occasions?: Array< string | null > | null,
      preparationMinutes?: number | null,
      pricePerServing?: number | null,
      readyInMinutes?: number | null,
      recipeId?: string | null,
      servings?: number | null,
      sourceName?: string | null,
      summary?: string | null,
      sustainable?: boolean | null,
      title?: string | null,
      updatedAt?: string | null,
      userId?: string | null,
      vegan?: boolean | null,
      vegetarian?: boolean | null,
      veryHealthy?: boolean | null,
      veryPopular?: boolean | null,
      weightWatcherSmartPoints?: number | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUserProfilesQueryVariables = {
  filter?: ModelUserProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserProfilesQuery = {
  listUserProfiles?:  {
    __typename: "ModelUserProfileConnection",
    items:  Array< {
      __typename: "UserProfile",
      allergies?: string | null,
      createdAt?: string | null,
      diet?: string | null,
      dietaryPreferences?: string | null,
      dislikedFoods?: string | null,
      email?: string | null,
      id: string,
      intolerances?: string | null,
      likedFoods?: string | null,
      owner?: string | null,
      updatedAt?: string | null,
      userId?: string | null,
      username?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateAssistantResponseConversationAISubscriptionVariables = {
  conversationId?: string | null,
};

export type OnCreateAssistantResponseConversationAISubscription = {
  onCreateAssistantResponseConversationAI?:  {
    __typename: "AmplifyAIConversationMessageStreamPart",
    associatedUserMessageId: string,
    contentBlockDeltaIndex?: number | null,
    contentBlockDoneAtIndex?: number | null,
    contentBlockIndex?: number | null,
    contentBlockText?: string | null,
    contentBlockToolUse?:  {
      __typename: "AmplifyAIToolUseBlock",
      input: string,
      name: string,
      toolUseId: string,
    } | null,
    conversationId: string,
    errors?:  Array< {
      __typename: "AmplifyAIConversationTurnError",
      errorType: string,
      message: string,
    } | null > | null,
    id: string,
    owner?: string | null,
    p?: string | null,
    stopReason?: string | null,
  } | null,
};

export type OnCreateConversationMessageConversationAISubscriptionVariables = {
  filter?: ModelSubscriptionConversationMessageConversationAIFilterInput | null,
  owner?: string | null,
};

export type OnCreateConversationMessageConversationAISubscription = {
  onCreateConversationMessageConversationAI?:  {
    __typename: "ConversationMessageConversationAI",
    aiContext?: string | null,
    associatedUserMessageId?: string | null,
    content?:  Array< {
      __typename: "AmplifyAIContentBlock",
      text?: string | null,
    } | null > | null,
    conversation?:  {
      __typename: "ConversationConversationAI",
      createdAt: string,
      id: string,
      metadata?: string | null,
      name?: string | null,
      owner?: string | null,
      updatedAt: string,
    } | null,
    conversationId: string,
    createdAt: string,
    id: string,
    owner?: string | null,
    role?: AmplifyAIConversationParticipantRole | null,
    toolConfiguration?:  {
      __typename: "AmplifyAIToolConfiguration",
    } | null,
    updatedAt: string,
  } | null,
};

export type OnCreateSavedRecipeSubscriptionVariables = {
  filter?: ModelSubscriptionSavedRecipeFilterInput | null,
};

export type OnCreateSavedRecipeSubscription = {
  onCreateSavedRecipe?:  {
    __typename: "SavedRecipe",
    aggregateLikes?: number | null,
    cheap?: boolean | null,
    cookingMinutes?: number | null,
    createdAt?: string | null,
    creditsText?: string | null,
    cuisines?: Array< string | null > | null,
    dairyFree?: boolean | null,
    diets?: Array< string | null > | null,
    dishTypes?: Array< string | null > | null,
    gaps?: string | null,
    glutenFree?: boolean | null,
    healthScore?: number | null,
    id: string,
    image?: string | null,
    instructions?: string | null,
    license?: string | null,
    lowFodmap?: boolean | null,
    occasions?: Array< string | null > | null,
    preparationMinutes?: number | null,
    pricePerServing?: number | null,
    readyInMinutes?: number | null,
    recipeId?: string | null,
    servings?: number | null,
    simplifiedInstructions?:  Array< {
      __typename: "simplifiedInstructions",
      ingredients?: Array< string | null > | null,
      number?: number | null,
      step?: string | null,
    } | null > | null,
    sourceName?: string | null,
    summary?: string | null,
    sustainable?: boolean | null,
    title?: string | null,
    updatedAt?: string | null,
    userId?: string | null,
    userProfile?:  {
      __typename: "UserProfile",
      allergies?: string | null,
      createdAt?: string | null,
      diet?: string | null,
      dietaryPreferences?: string | null,
      dislikedFoods?: string | null,
      email?: string | null,
      id: string,
      intolerances?: string | null,
      likedFoods?: string | null,
      owner?: string | null,
      updatedAt?: string | null,
      userId?: string | null,
      username?: string | null,
    } | null,
    vegan?: boolean | null,
    vegetarian?: boolean | null,
    veryHealthy?: boolean | null,
    veryPopular?: boolean | null,
    weightWatcherSmartPoints?: number | null,
  } | null,
};

export type OnCreateUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserProfileSubscription = {
  onCreateUserProfile?:  {
    __typename: "UserProfile",
    allergies?: string | null,
    createdAt?: string | null,
    diet?: string | null,
    dietaryPreferences?: string | null,
    dislikedFoods?: string | null,
    email?: string | null,
    id: string,
    intolerances?: string | null,
    likedFoods?: string | null,
    owner?: string | null,
    savedRecipes?:  {
      __typename: "ModelSavedRecipeConnection",
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    userId?: string | null,
    username?: string | null,
  } | null,
};

export type OnDeleteSavedRecipeSubscriptionVariables = {
  filter?: ModelSubscriptionSavedRecipeFilterInput | null,
};

export type OnDeleteSavedRecipeSubscription = {
  onDeleteSavedRecipe?:  {
    __typename: "SavedRecipe",
    aggregateLikes?: number | null,
    cheap?: boolean | null,
    cookingMinutes?: number | null,
    createdAt?: string | null,
    creditsText?: string | null,
    cuisines?: Array< string | null > | null,
    dairyFree?: boolean | null,
    diets?: Array< string | null > | null,
    dishTypes?: Array< string | null > | null,
    gaps?: string | null,
    glutenFree?: boolean | null,
    healthScore?: number | null,
    id: string,
    image?: string | null,
    instructions?: string | null,
    license?: string | null,
    lowFodmap?: boolean | null,
    occasions?: Array< string | null > | null,
    preparationMinutes?: number | null,
    pricePerServing?: number | null,
    readyInMinutes?: number | null,
    recipeId?: string | null,
    servings?: number | null,
    simplifiedInstructions?:  Array< {
      __typename: "simplifiedInstructions",
      ingredients?: Array< string | null > | null,
      number?: number | null,
      step?: string | null,
    } | null > | null,
    sourceName?: string | null,
    summary?: string | null,
    sustainable?: boolean | null,
    title?: string | null,
    updatedAt?: string | null,
    userId?: string | null,
    userProfile?:  {
      __typename: "UserProfile",
      allergies?: string | null,
      createdAt?: string | null,
      diet?: string | null,
      dietaryPreferences?: string | null,
      dislikedFoods?: string | null,
      email?: string | null,
      id: string,
      intolerances?: string | null,
      likedFoods?: string | null,
      owner?: string | null,
      updatedAt?: string | null,
      userId?: string | null,
      username?: string | null,
    } | null,
    vegan?: boolean | null,
    vegetarian?: boolean | null,
    veryHealthy?: boolean | null,
    veryPopular?: boolean | null,
    weightWatcherSmartPoints?: number | null,
  } | null,
};

export type OnDeleteUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserProfileSubscription = {
  onDeleteUserProfile?:  {
    __typename: "UserProfile",
    allergies?: string | null,
    createdAt?: string | null,
    diet?: string | null,
    dietaryPreferences?: string | null,
    dislikedFoods?: string | null,
    email?: string | null,
    id: string,
    intolerances?: string | null,
    likedFoods?: string | null,
    owner?: string | null,
    savedRecipes?:  {
      __typename: "ModelSavedRecipeConnection",
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    userId?: string | null,
    username?: string | null,
  } | null,
};

export type OnUpdateSavedRecipeSubscriptionVariables = {
  filter?: ModelSubscriptionSavedRecipeFilterInput | null,
};

export type OnUpdateSavedRecipeSubscription = {
  onUpdateSavedRecipe?:  {
    __typename: "SavedRecipe",
    aggregateLikes?: number | null,
    cheap?: boolean | null,
    cookingMinutes?: number | null,
    createdAt?: string | null,
    creditsText?: string | null,
    cuisines?: Array< string | null > | null,
    dairyFree?: boolean | null,
    diets?: Array< string | null > | null,
    dishTypes?: Array< string | null > | null,
    gaps?: string | null,
    glutenFree?: boolean | null,
    healthScore?: number | null,
    id: string,
    image?: string | null,
    instructions?: string | null,
    license?: string | null,
    lowFodmap?: boolean | null,
    occasions?: Array< string | null > | null,
    preparationMinutes?: number | null,
    pricePerServing?: number | null,
    readyInMinutes?: number | null,
    recipeId?: string | null,
    servings?: number | null,
    simplifiedInstructions?:  Array< {
      __typename: "simplifiedInstructions",
      ingredients?: Array< string | null > | null,
      number?: number | null,
      step?: string | null,
    } | null > | null,
    sourceName?: string | null,
    summary?: string | null,
    sustainable?: boolean | null,
    title?: string | null,
    updatedAt?: string | null,
    userId?: string | null,
    userProfile?:  {
      __typename: "UserProfile",
      allergies?: string | null,
      createdAt?: string | null,
      diet?: string | null,
      dietaryPreferences?: string | null,
      dislikedFoods?: string | null,
      email?: string | null,
      id: string,
      intolerances?: string | null,
      likedFoods?: string | null,
      owner?: string | null,
      updatedAt?: string | null,
      userId?: string | null,
      username?: string | null,
    } | null,
    vegan?: boolean | null,
    vegetarian?: boolean | null,
    veryHealthy?: boolean | null,
    veryPopular?: boolean | null,
    weightWatcherSmartPoints?: number | null,
  } | null,
};

export type OnUpdateUserProfileSubscriptionVariables = {
  filter?: ModelSubscriptionUserProfileFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserProfileSubscription = {
  onUpdateUserProfile?:  {
    __typename: "UserProfile",
    allergies?: string | null,
    createdAt?: string | null,
    diet?: string | null,
    dietaryPreferences?: string | null,
    dislikedFoods?: string | null,
    email?: string | null,
    id: string,
    intolerances?: string | null,
    likedFoods?: string | null,
    owner?: string | null,
    savedRecipes?:  {
      __typename: "ModelSavedRecipeConnection",
      nextToken?: string | null,
    } | null,
    updatedAt?: string | null,
    userId?: string | null,
    username?: string | null,
  } | null,
};
