"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/webhookRoutes.ts
const hono_1 = require("hono");
const webhookController_1 = require("../paymentcontroller/webhookController");
const webhookRouter = new hono_1.Hono();
webhookRouter.post('https://EXOTravel/webhooks/stripe', webhookController_1.webhookHandler);
exports.default = webhookRouter;
