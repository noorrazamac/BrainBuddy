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


    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify('No Student Exists!'),
    };
};
