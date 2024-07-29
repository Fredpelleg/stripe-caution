//const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')('sk_test_51HyIanFP8glmTVRLzAouEZLlPtvEFJYDe7m9RjjGI7K9rKkiBYJ8DliBKA2uxJU97oo9J1DI9trHWvvHsbVffqmS00AoBYxKpn'); // Utilisation directe de la clé secrète

exports.handler = async (event) => {
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
      payment_intent_data: {
        capture_method: 'manual',
      },
      success_url: 'https://musical-mousse-b4388f.netlify.app/success',
      cancel_url: 'https://musical-mousse-b4388f.netlify.app/cancel',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
