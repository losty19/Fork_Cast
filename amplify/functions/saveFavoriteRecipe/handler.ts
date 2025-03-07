import type { Schema } from '../../data/resource';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const ddbClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(ddbClient);

export const handler: Schema["SaveFavoriteRecipe"]["functionHandler"] = async (event) => {
    const { recipeId, userId, title, image } = event.arguments;

    // Save the recipe to the database
    const savedRecipe = {
        recipeId,
        userId,
        title,
        image,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    try {
        await docClient.send(
            new PutCommand({
                TableName: "SavedRecipes",
                Item: savedRecipe,
            })
        );

        return savedRecipe;
    } catch (error) {
        console.error('Error saving recipe:', error);
        throw new Error('Error saving recipe');
    }
}
