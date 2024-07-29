const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
//const stripe = require('stripe')('sk_test_51HyIanFP8glmTVRLMRyos2ErKwWGCTQRSO50GSNUqWkXwBXEJxnSrKGQsoCRBWW5c76AGC3ZydVytVwsTCVQAMMt004ydOJ0Jv'); // Utilisation directe de la clé secrète
exports.handler = async (event) => {
  console.log('Using Stripe Secret Key:', process.env.STRIPE_SECRET_KEY; // Vérifiez la clé ici


  const { amount, currency } = JSON.parse(event.body);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency,
          product_data: {
            name: 'Caution de Réservation',
          },
          unit_amount: amount,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://musical-mousse-b4388f.netlify.app/success.html',
      cancel_url: 'https://musical-mousse-b4388f.netlify.app/cancel.html',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.log('Error creating session:', error.message); // Log l'erreur pour plus de détails
    return {
      statusCode:
