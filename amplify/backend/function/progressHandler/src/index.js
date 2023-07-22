/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_COURSE_ARN
	STORAGE_COURSE_NAME
	STORAGE_COURSE_STREAMARN
	STORAGE_PROGRESS_ARN
	STORAGE_PROGRESS_NAME
	STORAGE_PROGRESS_STREAMARN
	STORAGE_STUDENT_ARN
	STORAGE_STUDENT_NAME
	STORAGE_STUDENT_STREAMARN
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify('Hello from Lambda!'),
    };
};
