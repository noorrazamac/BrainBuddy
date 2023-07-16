/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_STUDENT_ARN
	STORAGE_STUDENT_NAME
	STORAGE_STUDENT_STREAMARN
Amplify Params - DO NOT EDIT *//**
 * @fileoverview
 *
 * This CloudFormation Trigger creates a handler which awaits the other handlers
 * specified in the `MODULES` env var, located at `./${MODULE}`.
 */

/**
 * The names of modules to load are stored as a comma-delimited string in the
 * `MODULES` env var.
 */
const moduleNames = process.env.MODULES.split(',');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();
/**
 * The array of imported modules.
 */
const modules = moduleNames.map((name) => require(`./${name}`));

/**
 * This async handler iterates over the given modules and awaits them.
 *
 * @see https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html#nodejs-handler-async
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 *
 */
exports.handler = async (event, context) => {
  console.log(event);
  if('triggerSource' in event && event['triggerSource'] == "PostConfirmation_ConfirmSignUp"){
    let userName=event["userName"];
    let request=event["request"];
    let userAttributes=request["userAttributes"];
    let email=""
    let sub="";
    if("email" in userAttributes){
      email=userAttributes["email"];
    }
    if("sub" in userAttributes){
      sub=userAttributes["sub"];
    }
    console.log("userName",userName);
    console.log("email",email);
    // console.log("userName",userName);
    // console.log("userName",userName);
    
    // const tableName="student-"+process.env.ENV;
    const tableName=process.env.STORAGE_STUDENT_NAME
    const jsonObject = {
      id: sub,
      userName: userName,
      email: email,
      subscription_id: null,
      enrolled_courses:[],
      favorite_courses:[]
    };
  
    const params = {
      Item: AWS.DynamoDB.Converter.marshall(jsonObject),
      TableName: tableName
    };
  
    try {
      await dynamodb.putItem(params).promise();
      console.log('JSON object stored successfully in DynamoDB');
    } catch (err) {
      console.error('Error storing JSON object in DynamoDB', err);
    }
    await Promise.all(modules.map((module) => module.handler(event, context)));
  
    

  }
  // PostConfirmation_ConfirmSignUp
  /**
   * Instead of naively iterating over all handlers, run them concurrently with
   * `await Promise.all(...)`. This would otherwise just be determined by the
   * order of names in the `MODULES` var.
   */
  // log
  
  return event;
};
