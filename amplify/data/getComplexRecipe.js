import { util } from '@aws-appsync/utils';

export function request(ctx) {
    const { query, number, instructionsRequired, addRecipeInformation } = ctx.arguments;
    return {
        method: "GET",
        // resourcePath: "/recipes/complexSearch" + ctx.arguments.query,
        resourcePath: "/recipes/complexSearch",
        params: {
            query,
            number: number || 5,
            instructionsRequired: instructionsRequired !== false,
            addRecipeInformation: addRecipeInformation !== false,
            apiKey: process.env.SPOONACULAR_API_KEY,
        },
    };
}


export function response(ctx) {
    if (ctx.error) {
        return util.error(ctx.error.message, ctx.error.type);
    }
    if (ctx.result.statusCode == 200) {
        return JSON.parse(ctx.result.body).data;
    } else {
        return util.appendError(ctx.result.body, ctx.result.statusCode);
    }
}