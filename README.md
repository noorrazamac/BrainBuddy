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
- resource: course/{module}/content
- resource: course/{module}/content/quiz
- resource: course/{module}/content/quiz/question
- resource: course/{module}/content/quiz/submit
- resource: course/{module}/content/quiz/start
- resource: course/{module}/content/quiz/evaluate


Student API

- resource: student/
- resource: student/favourites
- resource: student/progress
- resource: student/certificate

<!-- Admin API

- resouce:  -->