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
                const data = await dynamodb.scan(params).promise();
                const items = data.Items.map(item => DynamoDB.Converter.unmarshall(item));
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
                    body: JSON.stringify('Error finding the Course!')
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
