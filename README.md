API Design

Subscription API

- resourse: subscription/
    - get # fetches current subscription details
    - post # creates new Subscription if doesn't exists
    - update # udpates existing subscription
    - delete # deletes the subscription 

- resource: subscription/payment



Course API

- resource: course/
- resource: module/
- resource: content/
- resource: content/quiz/question/
- resource: content/quiz/submit/{proxy+}
- resource: content/quiz/start/{proxy+}
- resource: content/quiz/evaluate/{proxy+}
- resource: content/video/
- resource: content/reading/


Student API

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
