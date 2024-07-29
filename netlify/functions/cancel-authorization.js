const stripe = require('stripe')('sk_test_51HyIanFP8glmTVRLMRyos2ErKwWGCTQRSO50GSNUqWkXwBXEJxnSrKGQsoCRBWW5c76AGC3ZydVytVwsTCVQAMMt004ydOJ0Jv'); // Utilisez la nouvelle clé secrète

exports.handler = async (event) => {
  const { paymentIntentId } = JSON.parse(event.body);

  try {
    const canceledPaymentIntent = await stripe.paymentIntents.cancel(paymentIntentId);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, paymentIntent: canceledPaymentIntent }),
    };
  } catch (error) {
    console.log('Error canceling PaymentIntent:', error.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
