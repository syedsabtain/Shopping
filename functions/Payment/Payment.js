const dotenv = require('dotenv');
dotenv.config();
const Stripee = require('stripe');
const stripe = Stripee(process.env.STRIPE_SECRETKEY);
exports.handler = async (event) => {
  try {
    
    const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
     currency: 'usd',
     // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'accept_a_payment'},
    });
    // const subject = event.queryStringParameters.name || 'World'
    
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
