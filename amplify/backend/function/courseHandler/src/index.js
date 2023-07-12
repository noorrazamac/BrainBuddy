/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_CONTENT_ARN
	STORAGE_CONTENT_NAME
	STORAGE_CONTENT_STREAMARN
	STORAGE_COURSE_ARN
	STORAGE_COURSE_NAME
	STORAGE_COURSE_STREAMARN
	STORAGE_MODULE_ARN
	STORAGE_MODULE_NAME
	STORAGE_MODULE_STREAMARN
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify('Hello from Lambda!'),
    };
};
