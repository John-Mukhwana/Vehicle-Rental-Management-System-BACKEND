

// // backend/src/routes/paymentRoutes.ts
// import { Hono } from 'hono';
// import { createPaymentIntentHandler } from '../paymentcontroller/paymentController';
// ;

// const paymentsRouter= new Hono();

// paymentsRouter.post('/api/create-payment-intent', createPaymentIntentHandler);

// export default paymentsRouter;
// backend/src/routes/paymentRoutes.ts

import {cors} from 'hono/cors';






import { Hono } from 'hono';

import { createPaymentIntentHandler } from '../paymentcontroller/paymentController';

const paymentsRouter = new Hono();
paymentsRouter.use('*', cors({
    origin: ['http://localhost:5174','http://localhost:5173'], // Your frontend URL
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
  }));

// Define the route correctly
paymentsRouter.post('/api/create-payment-intent', createPaymentIntentHandler);

export default paymentsRouter;
