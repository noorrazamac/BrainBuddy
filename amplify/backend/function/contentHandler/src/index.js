/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_CONTENT_ARN
	STORAGE_CONTENT_NAME
	STORAGE_CONTENT_STREAMARN
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

async function getItemFromDynamoDB(event) {
    if ('queryStringParameters' in event) {
        const pathParameters = event["queryStringParameters"];
        if (pathParameters && 'content_id' in pathParameters) {
            const student_id = pathParameters["content_id"];
            console.log("fetching data for content: ", content_id);
            const params = {
                TableName: process.env.STORAGE_CONTENT_NAME,
                // TableName: "student-" + process.env.ENV,
                Key: {
                    id: { S: content_id } // Assuming the primary key is of type string
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
                    body: JSON.stringify('Error finding the Content!')
                };
            }
        }
    }
}

createItemInDynamoDB = async (event) => {
    if ('body' in event) {
        const body = JSON.parse(event['body']);
        if (body && 'student_id' in body) {
            const content_id = body["content_id"];
            console.log("creating data for content: ", content_id);
            const jsonObject = {
                id: content_id,
                name: body["name"],
                description: body["description"],
                source_path: body["source_path"],
                type: body["type"],
              };
            
              const params = {
                Item: AWS.DynamoDB.Converter.marshall(jsonObject),
                TableName: process.env.STORAGE_CONTENT_NAME,
            };
            try {
                const result = await dynamodb.putItem(params).promise();
                console.log('Retrieved item:', result);
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*"
                    },

                    body: JSON.stringify(result)
                };
            }
            catch (err) {
                console.error('Error creating item in DynamoDB', err);
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*"
                    },
                    body: JSON.stringify('Error creating the Content!')
                };
            }
        }
    }
}

updateItemInDynamoDB = async (event) => {
    if ('body' in event) {
        const body = JSON.parse(event['body']);
        if (body && 'content_id' in body) {
            const content_id = body["content_id"];
            console.log("updating data for content: ", content_id);
            const jsonObject = {
                id: content_id,
                name: body["name"],
                description: body["description"],
                source_path: body["source_path"],
                type: body["type"],
              };
            
              const params = {
                Item: AWS.DynamoDB.Converter.marshall(jsonObject),
                TableName: process.env.STORAGE_CONTENT_NAME
            };
            try {
                const result = await dynamodb.updateItem(params).promise();
                console.log('Retrieved item:', result);
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*"
                    },
                }
            }
            catch (err) {
                console.error('Error updating item in DynamoDB', err);
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*"
                    },
                    body: JSON.stringify('Error updating the Content!')
                };
            }
        }

    }
}



exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
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
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify('Hello from Lambda!'),
    };
};
