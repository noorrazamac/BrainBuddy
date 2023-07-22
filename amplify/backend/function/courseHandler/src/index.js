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

async function fetch_content(content_id) {
    const params = {
        TableName: "content-dev",
        // TableName: "student-" + process.env.ENV,

        Key: {
            id: { S: content_id } // Assuming the primary key is of type string
        }
    };
    try {
        const result = await dynamodb.getItem(params).promise();
        const item = AWS.DynamoDB.Converter.unmarshall(result.Item);
        console.log('Retrieved item:', item);
        return item;
    }
    catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify(error)
        };
    }
}

async function fetch_module(module_id) {
    const params = {
        TableName: "module-dev",
        // TableName: "student-" + process.env.ENV,
        Key: {
            id: { S: module_id } // Assuming the primary key is of type string
        }
    };
    try {
        const result = await dynamodb.getItem(params).promise();
        const item = AWS.DynamoDB.Converter.unmarshall(result.Item);
        console.log('Retrieved item:', item);
        const content_array=[]
        for (let i = 0; i < item["contents"].length; i++) {
            const content_id = item["contents"][i]["content_id"];
            const content = await fetch_content(content_id);
            // item["contents"][i] = content;
            content_array.push({"order":item["contents"][i]["order"],"contents":content});
        }
        return content_array;
    }
    catch (err) {
        console.error('Error retrieving item from DynamoDB', err);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify('Error finding the Module!')
        };
    }
}
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
				const modules=item["modules"];
				console.log("modules: ", modules);
                const module_arrays=[];
                for(let i=0;i<modules.length;i++){
                    const module_id=modules[i].module_id;
                    const module = await fetch_module(module_id)
                    module_arrays.push({order:modules[i].order, modules:module})
                }
                item["modules"]=module_arrays;
                // console.log("item:=================");
                console.log("item: ", JSON. stringify(item)  );
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
        else{
            // code to fetch all courses from dynamodb
            const params = {
                TableName: process.env.STORAGE_COURSE_NAME,
                
            }
    
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
                    body: JSON.stringify('Error finding the Course!')
                };
              }
            
        }
	}
}


createCourseInDynamoDB = async (event) => {
	if ('body' in event) {
		const body = JSON.parse(event['body']);
        if (body && 'course_id' in body) {
            const course_id = body["course_id"];
            console.log("creating data for course: ", course_id);
            const jsonObject = {
                id: course_id,
                title: "title"in body?body["title"]:"",
				category: "category" in body?body["category"]:"",
				description: "description" in body?body["description"]:"",
				additionalDescription: "additionalDescription" in body?body["additionalDescription"]:"",
				instructor: "instructor" in body?body["instructor"]:"",
				duration: "duration" in body?body["duration"]:"",
				rating: "rating" in body?body["rating"]:"",
				image: "image" in body?body["image"]:"",
				modules: "modules" in body?body["modules"]:[]
              };
            
              const params = {
                Item: AWS.DynamoDB.Converter.marshall(jsonObject),
                TableName: process.env.STORAGE_COURSE_NAME
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
                    body: JSON.stringify('Error creating the Course!')
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
