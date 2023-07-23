/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_STUDENT_ARN
	STORAGE_STUDENT_NAME
	STORAGE_STUDENT_STREAMARN
Amplify Params - DO NOT EDIT *//**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event) => {
    console.log(`EVENT: ${(event['resource'])}`);
    console.log(`EVENT: ${(event['path'])}`);
    console.log(`EVENT: ${(event['httpMethod'])}`);
    if ('path' in event && 'httpMethod') {
        const httpMethod = event['httpMethod'];
        if (httpMethod == 'GET') {
            console.log("Executing GET")
            return await getItemFromDynamoDB(event);
        }
        else if(httpMethod == 'POST'){
            console.log("Executing POST")
            return await createItemInDynamoDB(event);
        }
        else if(httpMethod == 'PUT'){
            console.log("Executing PUT")
            return await updateItemInDynamoDB(event);
        }
    }

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify('No Student Exists!'),
    };
};