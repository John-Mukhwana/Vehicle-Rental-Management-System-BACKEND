"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookHandler = void 0;
const stripe_1 = __importDefault(require("../utils/stripe"));
const webhookService_1 = require("../paymentservices/webhookService");
const webhookHandler = async (c) => {
    const sig = c.req.header('stripe-signature') || '';
    const payload = await c.req.text();
    try {
        const event = stripe_1.default.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);
        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;
            await (0, webhookService_1.handlePaymentSucceeded)(paymentIntent);
        }
        return c.json({ received: true });
    }
    catch (error) {
        console.error(error);
        return c.json({ error: error.message }, 400);
    }
};
exports.webhookHandler = webhookHandler;
