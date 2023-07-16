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

const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB();

async function getItemFromDynamoDB(event) {
	if ('queryStringParameters' in event) {
		const pathParameters = event["queryStringParameters"];
		if (pathParameters && 'course_id' in pathParameters) {
			const course_id = pathParameters["course_id"];
			console.log("fetching data for course: ", course_id);
			const params = {
				TableName: process.env.STORAGE_COURSE_NAME,
				// TableName: "student-" + process.env.ENV,
				Key: {
					id: { S: course_id } // Assuming the primary key is of type string
				}
			};
			try {

				const result = await dynamodb.getItem(params).promise();
				const item = AWS.DynamoDB.Converter.unmarshall(result.Item);
				console.log('Retrieved item:', item);
				return {
					statusCode: 200,
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Headers": "*"
					},
					body: JSON.stringify(item)
				};
			}
			catch (err) {
				console.error('Error retrieving item from DynamoDB', err);
				return {
					statusCode: 200,
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Headers": "*"
					},
					body: JSON.stringify('Error finding the Course!')
				};
			}
		}
	}
}

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
            return await createCourseInDynamoDB(event);
        }
        // else if(httpMethod == 'PUT'){
        //     console.log("Executing PUT")
        //     return await updateItemInDynamoDB(event);
        // }
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
