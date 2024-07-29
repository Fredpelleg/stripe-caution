const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const axios = require('axios'); // Désactiver l'importation de axios si non utilisé

exports.handler = async (event) => {
  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    console.log(`Session completed for ${session.customer_email}`);
    // await sendWelcomeBook(session.customer_email); // Désactiver l'appel à la fonction sendWelcomeBook
  }

  return { statusCode: 200, body: 'Success' };
};

/*
// Vous pouvez commenter ou supprimer cette fonction
async function sendWelcomeBook(email) {
  const apiUrl = 'https://api.smoobu.com/v1/email/send';
  const apiToken = process.env.SMOOBU_API_TOKEN;

  await axios.post(apiUrl, {
    to: email,
    subject: 'Votre Livret d\'Accueil',
    body: 'Voici votre livret d\'accueil pour votre séjour...'
  }, {
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json'
    }
  });
}
*/
