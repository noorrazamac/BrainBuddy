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
- resource: student/favourites
- resource: student/progress/
- resource: student/progress/{proxy+}
- resource: student/certificate/
- resource: student/certificate/{proxy+}

<!-- Admin API

- resouce:  -->