const stripe = require('stripe')('sk_test_51HyIanFP8glmTVRLzAouEZLlPtvEFJYDe7m9RjjGI7K9rKkiBYJ8DliBKA2uxJU97oo9J1DI9trHWvvHsbVffqmS00AoBYxKpn'); // Utilisation directe de la clé secrète

exports.handler = async (event) => {
  console.log('Using Stripe Secret Key:', 'sk_test_51HyIanFP8glmTVRLzAouEZLlPtvEFJYDe7m9RjjGI7K9rKkiBYJ8DliBKA2uxJU97oo9J1DI9trHWvvHsbVffqmS00AoBYxKpn'); // Vérifiez la clé ici

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
