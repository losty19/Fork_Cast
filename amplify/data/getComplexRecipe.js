import { util } from '@aws-appsync/utils';

export function request(ctx) {
    const { path, httpMethod, queryStringParameters, pathParameters } = ctx.arguments;
    
    // Construct the full path
    let resourcePath = path;
    if (pathParameters && pathParameters.path_id) {
        resourcePath = path.replace('{id}', pathParameters.path_id);
    }

    // Add API key to query parameters
    const params = {
        ...queryStringParameters,
        apiKey: process.env.SPOONACULAR_API_KEY,
    };

    return {
        method: httpMethod,
        resourcePath,
        params,
    };
}

export function response(ctx) {
    if (ctx.error) {
        return util.error(ctx.error.message, ctx.error.type);
    }
    
    if (ctx.result.statusCode === 200) {
        return JSON.parse(ctx.result.body);
    } else {
        return util.appendError(ctx.result.body, ctx.result.statusCode);
    }
}