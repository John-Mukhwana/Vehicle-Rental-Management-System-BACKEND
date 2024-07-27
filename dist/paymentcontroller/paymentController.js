// import { Context } from 'hono';
// import Stripe from 'stripe';
// import { createCheckoutSession, updateBookingStatus } from '../paymentservices/paymentService';
import Stripe from 'stripe';
import { createCheckoutSession, updateBookingStatus } from '../paymentservices/paymentService';
const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY, {
    apiVersion: '2024-06-20',
});
export const createCheckoutSessionHandler = async (c) => {
    try {
        const body = await c.req.json();
        const { amount, currency, bookingId } = body;
        if (!amount || !currency || !bookingId) {
            return c.json({ error: 'Amount, currency, and booking ID are required' }, 400);
        }
        const session = await createCheckoutSession(amount, currency, bookingId);
        return c.json({ sessionId: session.id, checkoutUrl: session.url });
    }
    catch (error) {
        console.error('Error creating checkout session:', error.message);
        return c.json({ error: error.message }, 400);
    }
};
export const stripeWebhookHandler = async (c) => {
    const sig = c.req.header('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!sig || !webhookSecret) {
        return c.json({ error: 'Missing signature or webhook secret' }, 400);
    }
    try {
        const rawBody = await c.req.text(); // Get raw body as a string
        const event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
        switch (event.type) {
            case 'checkout.session.completed':
                const completedSession = event.data.object;
                await handleCheckoutSessionCompleted(completedSession);
                break;
            case 'checkout.session.async_payment_failed':
                const failedSession = event.data.object;
                await handleCheckoutSessionFailed(failedSession);
                break;
            default:
                console.warn(`Unhandled event type ${event.type}`);
        }
        return c.json({ received: true });
    }
    catch (error) {
        console.error('Error handling webhook event:', error.message);
        return c.json({ error: error.message }, 400);
    }
};
const handleCheckoutSessionCompleted = async (session) => {
    if (session.metadata) {
        const bookingId = parseInt(session.metadata.bookingId || '');
        if (bookingId) {
            await updateBookingStatus(bookingId, 'Confirmed');
        }
    }
};
const handleCheckoutSessionFailed = async (session) => {
    if (session.metadata) {
        const bookingId = parseInt(session.metadata.bookingId || '');
        if (bookingId) {
            await updateBookingStatus(bookingId, 'Cancelled');
        }
    }
};
