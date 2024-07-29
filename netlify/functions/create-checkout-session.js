const stripe = require('stripe')('sk_test_51HyIanFP8glmTVRLMRyos2ErKwWGCTQRSO50GSNUqWkXwBXEJxnSrKGQsoCRBWW5c76AGC3ZydVytVwsTCVQAMMt004ydOJ0Jv'); // Utilisez la nouvelle clé secrète

exports.handler = async (event) => {
  console.log('Using Stripe Secret Key:', 'sk_test_51HyIanFP8glmTVRLMRyos2ErKwWGCTQRSO50GSNUqWkXwBXEJxnSrKGQsoCRBWW5c76AGC3ZydVytVwsTCVQAMMt004ydOJ0Jv'); // Vérifiez la clé ici

  const { amount, currency } = JSON.parse(event.body);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      payment_method_types: ['card'],
      capture_method: 'manual', // Pour créer une autorisation
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret, id: paymentIntent.id }),
    };
  } catch (error) {
    console.log('Error creating PaymentIntent:', error.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
