const dotenv = require('dotenv');
dotenv.config();
const Stripee = require('stripe');
const stripe = Stripee(process.env.STRIPE_SECRETKEY);

exports.handler = async (event) => {
  
  try {
    const data = JSON.parse(event.body);
    const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(data.data)*100,
     currency: 'usd',
     // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'accept_a_payment'},
    });
    // const subject = event.queryStringParameters.name || 'World'
    // console.log(paymentIntent,'fun')
    return {
      statusCode: 200,
      body: JSON.stringify({ CLIENT_SECRET: paymentIntent.client_secret }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}
