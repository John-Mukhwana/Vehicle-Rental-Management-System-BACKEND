

// backend/src/controllers/webhookController.ts
import { Context } from 'hono';
import stripe from '../utils/stripe';
import { handlePaymentSucceeded } from '../paymentservices/webhookService';

export const webhookHandler = async (c: Context) => {
  const sig = c.req.header('stripe-signature') || '';
  const payload = await c.req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      await handlePaymentSucceeded(paymentIntent);
    }

    return c.json({ received: true });
  } catch (error) {
    console.error(error);
    return c.json({ error: (error as Error).message }, 400);
  }
};
