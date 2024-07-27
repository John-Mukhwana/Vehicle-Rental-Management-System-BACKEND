// backend/src/routes/webhookRoutes.ts
import { Hono } from 'hono';
import { webhookHandler } from '../paymentcontroller/webhookController';
const webhookRouter = new Hono();
webhookRouter.post('https://EXOTravel/webhooks/stripe', webhookHandler);
export default webhookRouter;
