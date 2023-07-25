

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const stripe = require('stripe')('sk_test_51NVKhcKgcfY74efpnOe9EPqkhsDb4lZlyk2mm6u91ENSixJapsYa1w0nUKFWqWPuEKISTrwjjvxZrdH0g44Hgdxi00BNaHtbHW');

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const body = JSON.parse(event['body']);
    const amount=1;
    if('amount' in body){
        console.log("amount: ", body['amount']);
        amount=body['amount'];
    }

    try {
        // create a PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
          //amount: req.body.amount, // Integer, usd -> pennies, eur -> cents
          amount:amount,
          currency: 'cad',
          payment_method_types: ["card"],
        });
        // Return the secret
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({ paymentIntent: paymentIntent.client_secret }),
        };
      } catch (e) {
        console.error('Error creating item in DynamoDB', err);
                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Headers": "*"
                    },
                    body: JSON.stringify('Error creating the Module!')
                };
      }
    
};
