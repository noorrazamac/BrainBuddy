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
async function getItemFromDynamoDB(event) {
    if ('queryStringParameters' in event) {
        const pathParameters = event["queryStringParameters"];
        if (pathParameters && 'student_id' in pathParameters) {
            const student_id = pathParameters["student_id"];
            console.log("fetching data for student: ", student_id);
            const params = {
                TableName: process.env.STORAGE_STUDENT_NAME,
                // TableName: "student-" + process.env.ENV,
                Key: {
                    id: { S: student_id } // Assuming the primary key is of type string
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
                    body: JSON.stringify('Error finding the Student!')
                };
            }
        }
    }
}

createItemInDynamoDB = async (event) => {
    if ('body' in event) {
        const body = JSON.parse(event['body']);
        if (body && 'student_id' in body) {
            const student_id = body["student_id"];
            console.log("creating data for student: ", student_id);
            const params = {
                TableName: process.env.STORAGE_STUDENT_NAME,
                // TableName: "student-" + process.env.ENV,
                Item: {
                    id: { S: student_id }, // Assuming the primary key is of type string
                    name: { S: body["name"] },
                    email: { S: body["email"] },
                    phone: { S: body["phone"] },
                    address: { S: body["address"] },
                    city: { S: body["city"] },
                    state: { S: body["state"] },

                }
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
                    body: JSON.stringify('Error creating the Student!')
                };
            }
        }
    }
}

updateItemInDynamoDB = async (event) => {
    if ('body' in event) {
        const body = JSON.parse(event['body']);
        if (body && 'student_id' in body) {
            const student_id = body["student_id"];
            console.log("updating data for student: ", student_id);
            const params = {
                TableName: process.env.STORAGE_STUDENT_NAME,
                // TableName: "student-" + process.env.ENV,
                Key: {
                    id: { S: student_id }, // Assuming the primary key is of type string
                },
                UpdateExpression: "set #name = :name, #email = :email, #phone = :phone, #address = :address, #city = :city, #state = :state",
                ExpressionAttributeNames: {
                    "#name": "name",
                    "#email": "email",
                    "#phone": "phone",
                    "#address": "address",
                    "#city": "city",
                    "#state": "state",
                },
                ExpressionAttributeValues: {
                    ":name": { S: body["name"] },
                    ":email": { S: body["email"] },
                    ":phone": { S: body["phone"] },
                    ":address": { S: body["address"] },
                    ":city": { S: body["city"] },
                    ":state": { S: body["state"] },
                },

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
                    body: JSON.stringify('Error updating the Student!')
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