// backend/src/controllers/paymentController.ts
import { Context } from 'hono';
import { createPaymentIntent } from '../paymentservices/paymentService';

export const createPaymentIntentHandler = async (c: Context) => {
  try {
    const paymentData = await c.req.json();
    const response = await createPaymentIntent(paymentData);
    return c.json(response);
  } catch (error) {
    console.error(error);
    return c.json({ error: (error as Error).message }, 500);
  }
};


