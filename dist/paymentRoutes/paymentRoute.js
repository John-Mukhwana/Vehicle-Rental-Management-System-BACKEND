"use strict";
// import { Hono } from "hono";
// import { createCheckoutSessionHandler } from "../paymentcontroller/paymentController";
// import { stripeWebhookHandler } from "../paymentcontroller/paymentController";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeRouter = void 0;
// export const stripeRouter = new Hono();
// stripeRouter.post('/create-checkout-session', createCheckoutSessionHandler);
// stripeRouter.post('/stripe-webhook', stripeWebhookHandler); // Added webhook handler
// import { Hono } from "hono";
// import { createCheckoutSessionHandler, stripeWebhookHandler } from "../paymentcontroller/paymentController";
// export const stripeRouter = new Hono();
// stripeRouter.post('/create-checkout-session', createCheckoutSessionHandler);
// stripeRouter.post('/stripe-webhook', stripeWebhookHandler); // Added webhook handler
const hono_1 = require("hono");
const paymentController_1 = require("../paymentcontroller/paymentController");
exports.stripeRouter = new hono_1.Hono();
exports.stripeRouter.post('/create-checkout-session', paymentController_1.createCheckoutSessionHandler);
exports.stripeRouter.post('/stripe-webhook', paymentController_1.stripeWebhookHandler); // Added webhook handler
