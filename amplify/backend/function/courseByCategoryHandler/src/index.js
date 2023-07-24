/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_COURSE_ARN
	STORAGE_COURSE_NAME
	STORAGE_COURSE_STREAMARN
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  */
const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB();

async function getItemFromDynamoDB(event) {
	if ('queryStringParameters' in event) {
		const pathParameters = event["queryStringParameters"];
		if (pathParameters && 'category' in pathParameters) {
			const category = pathParameters["category"];
			console.log("fetching data for category: ", category);
			const params = {
                TableName: process.env.STORAGE_COURSE_NAME,
                FilterExpression: 'category = :categoryValue',
                ExpressionAttributeValues: {
                  ':categoryValue': { S: category }
                }
              };
		
    
            try {
                const data = await dynamodb.scan(params).promise();
                const items = data.Items.map(item => AWS.DynamoDB.Converter.unmarshall(item));
                console.log('Fetched items:', items);
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*"
                    },
                    body: JSON.stringify(items)
                };
              } catch (err) {
                console.error('Error fetching items from DynamoDB', err);
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*"
                    },
                    body: JSON.stringify('Error finding the category!')
                };
              }
            
        }
	}
}



exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    if ('path' in event && 'httpMethod') {
        const httpMethod = event['httpMethod'];
        if (httpMethod == 'GET') {
            console.log("Executing GET")
            return await getItemFromDynamoDB(event);
        }
        // else if(httpMethod == 'POST'){
        //     console.log("Executing POST")
        //     return await createCourseInDynamoDB(event);
        // }
        // else if(httpMethod == 'PUT'){
        //     console.log("Executing PUT")
        //     return await updateItemInDynamoDB(event);
        // }
    }

    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify('Hello from Lambda123!'),
    };
};
