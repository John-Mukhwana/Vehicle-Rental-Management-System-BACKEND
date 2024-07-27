// import { Hono } from "hono";
// import { createCheckoutSessionHandler } from "../paymentcontroller/paymentController";
// import { stripeWebhookHandler } from "../paymentcontroller/paymentController";
// export const stripeRouter = new Hono();
// stripeRouter.post('/create-checkout-session', createCheckoutSessionHandler);
// stripeRouter.post('/stripe-webhook', stripeWebhookHandler); // Added webhook handler
// import { Hono } from "hono";
// import { createCheckoutSessionHandler, stripeWebhookHandler } from "../paymentcontroller/paymentController";
// export const stripeRouter = new Hono();
// stripeRouter.post('/create-checkout-session', createCheckoutSessionHandler);
// stripeRouter.post('/stripe-webhook', stripeWebhookHandler); // Added webhook handler
import { Hono } from "hono";
import { createCheckoutSessionHandler, stripeWebhookHandler } from "../paymentcontroller/paymentController";
export const stripeRouter = new Hono();
stripeRouter.post('/create-checkout-session', createCheckoutSessionHandler);
stripeRouter.post('/stripe-webhook', stripeWebhookHandler); // Added webhook handler
