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
- resource: course/module/
- resource: content/quiz/submit/{proxy+}
- resource: content/quiz/start/{proxy+}
- resource: content/quiz/evaluate/{proxy+}
- resource: content/video/{proxy+}
- resource: content/reading/{proxy+}


Student API

- resource: student/
- resource: student/favourites
- resource: student/progress/
- resource: student/progress/{proxy+}
- resource: student/certificate/
- resource: student/certificate/{proxy+}

<!-- Admin API

- resouce:  -->