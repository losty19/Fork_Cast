import { util } from '@aws-appsync/utils';
import { secret } from '@aws-amplify/backend';

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
        apiKey: secret('SPOONACULAR_API_KEY'),
    };

    // Convert params to URL query string
    const queryString = Object.entries(params)
        .filter(([_, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    return {
        method: httpMethod,
        resourcePath: `${resourcePath}${queryString ? `?${queryString}` : ''}`,
        headers: {
            'Content-Type': 'application/json',
        },
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