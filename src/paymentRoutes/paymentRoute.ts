

// backend/src/routes/paymentRoutes.ts
import { Hono } from 'hono';
import { createPaymentIntentHandler } from '../paymentcontroller/paymentController';
;

const paymentsRouter= new Hono();

paymentsRouter.post('/api/create-payment-intent', createPaymentIntentHandler);

export default paymentsRouter;
