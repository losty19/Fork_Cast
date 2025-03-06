import type { Schema } from '../../data/resource';


export const handler: Schema["SaveFavoriteRecipe"]["functionHandler"] = async (event) => {
    const { recipeId, userId, title, image } = event.arguments;

    // Save the recipe to the database
    const savedRecipe = await data.models.SavedRecipe.create({
        recipeId,
        userId,
        title,
        image,

        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });
    return savedRecipe;
}