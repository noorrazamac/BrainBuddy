API Design

Subscription API

- resourse: subscription/
	- Connects to "subscriptionHandler" Lambda function to manage data in "subscription" dynamoDB table
	- e.g.
		- get # fetches current subscription details
		- post # creates new Subscription if doesn't exists
		- update # udpates existing subscription
		- delete # deletes the subscription 

- resource: subscription/payment
	- Connects to "paymentsHandler" Lambda function to manage data in "payments" dynamoDB table

Course API

- resource: course/
	- Connects to "courseHandler" Lambda function to manage data in "course" dynamoDB table
	
- resource: module/
	- Connects to "moduleHandler" Lambda function to manage data in "module" dynamoDB table

- resource: content/
	- Connects to "contentHandler" Lambda function to manage data in "content" dynamoDB table

//TODO
- resource: content/quiz/question/
- resource: content/quiz/submit/{proxy+}
- resource: content/quiz/start/{proxy+}
- resource: content/quiz/evaluate/{proxy+}
- resource: content/video/
- resource: content/reading/


Student API

- resource: student/
	- Connects to "studentHandler" Lambda function to manage data in "student" dynamoDB table

- resource: student/favourites/
	- Connects to "favouritesHandler" Lambda function to manage data in "student" dynamoDB table

- resource: student/progress/
	- Connects to "progressHandler" Lambda function to manage data in "progress" dynamoDB table

//TODO
- resource: student/certificate/

--> Mark as complete

<!-- Admin API

- resouce:  -->


Tables:

Users:

Course:

{
	name:	
	category:
	level:
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
	description:
	type:
}

//TODO
Quiz:
{
	name:
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
