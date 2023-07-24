
# API Design

### Subscription API

- resourse: subscription/

  - get # fetches current subscription details
  - post # creates new Subscription if doesn't exists
  - update # udpates existing subscription
  - delete # deletes the subscription
- resource: subscription/payment

### Course API

- resource: course/
- resource: module/
- resource: content/
- resource: content/quiz/question/
- resource: content/quiz/submit/{proxy+}
- resource: content/quiz/start/{proxy+}
- resource: content/quiz/evaluate/{proxy+}
- resource: content/video/
- resource: content/reading/

### Student API

- resource: student/
- resource: student/favourites/
- resource: student/progress/

<!-- - resource: student/progress/{proxy+} -->

- resource: student/certificate/

<!-- - resource: student/certificate/{proxy+} -->

--> Mark as complete

<!-- Admin API

- resouce:  -->

Tables:

Users:

Course:

{
	id:
	title:
	description:
	additionalDescription:
	instructor:
	duration
	category
	modules:[
		{
			order:
			module_id:
		}
	]
	rating:
}

Module:
{
	id:
	name:
	contents:{
		order:
		content_id:
	}
}

Content:
{
	name:
	description:
	source_path:
	type:
}

//TODO
Quiz:
{
	id:
	name:
	questions:[
		id: 
		question: 
		options: []
		correctAnswer: 
	]
    
  }
}

Progress: ()
{
	student id
	courses:[{
		courseid:
		enrolled date:
		completed_modules:[]
		completed_content:[]
		Percentage_completed:
	}]
}

Student:
{
	id:
	student name:
	enrolled_courses:[

    ]
	favorite_courses:[

    ]
	subscription_id:
}

Subscription:
{
	id
	trial_used:
	payments:[
	]
	end_date:
}

Payments:
{
	date:
	amount:
	method:
	status:
}





# AWS Guide

### Amplify

    **CLI Tool**  -> Full Stack Application backend (Resource Provisioning)
	**Console** -> deploy website on s3 and cloud front
	**SDK** -> merge frontend and backend

    Categories (3 of our use)

    **API will call function**
			GraphQL
			**REST API** (we are using)
				it uses API Gateway
					it has resources (everything comes after / in URL)
					Every resource is a path but not vice versa
						as path can be proxy path
					Resource is mapped to LAMBDA FUNCTION
					|RESOURCES| = |LAMBDA FUNCTION|

    **Function will call Storage**
			**Lambda Function** is a serverless version of a EC2 instance that runs Nodejs
			Path in project directory -> "/amplify/backend/function/function_name/src/index.js"
				(export.handler will run first)
				API Gateway will forward request to Lambda Function in specific format which will be processed in that function (in event variable)
					We have PATH and RESOURCE and METHOD and QUERY STRING PARAMETER and BODY (in case of POST request)
					POSTMAN Configuration
						Authorization Type: AWS Signature
						Configure Access Key with CLI Access Keys
						Region: us-east-1
						Service: execute-api

    PERMISSIONS ALREADY SET

    **AMPLIFY PUSH** (for deploying code on AWS)
					check everything (dynamoDB, Authentication)
				**AMPLIFY PUSH FUNCTION**
					check only function (better to use in our case)

### Storage

    Learn from documentation / LinkedIn Learning / ChatGPT
		2 Type**DynamoDB**
			**s3 Bucket** (assets -> images, videos)
				will call s3 bucket directly in order because API gateway has size limit of response, we will fetch the path of asset from DynamoDB and we will make API call to s3 from frontend to fetch the asset (get code from AMPLIFY SDK for js)
					https://docs.amplify.aws/lib/q/platform/react-native/

Console.log() in the Lambda Function are recorded in a cloud watch
	To Debug -> Open latest cloud watch stream (Log will be sorted as per time)
		open latest LOG STREAM and check LATEST TIME
		It might take some time for log to appear (wait for 30-40 seconds)

**Cognito** -> authentication, authorization
	https://docs.amplify.aws/lib/auth/overview/q/platform/react-native/#social-provider-federation

**DynamoDB** -> No-SQL Database
s3 -> Blob Storage

**API Gateway** -> REST API

**Lambda** -> Serverless EC2 Container that runs nodejs runtime

**API Calls from React Native**
	https://docs.amplify.aws/lib/restapi/fetch/q/platform/react-native/
