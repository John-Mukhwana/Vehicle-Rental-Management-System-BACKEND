"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const hono_1 = require("hono");
const payment_controller_1 = require("./payment.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const bearAuth_1 = require("../middleware/bearAuth");
exports.paymentRouter = new hono_1.Hono();
//get all users      api/users
exports.paymentRouter.get("/payments", bearAuth_1.userOrAdminRoleAuth, payment_controller_1.listPayments);
//get a single user    api/users/1
exports.paymentRouter.get("/payments/:id", bearAuth_1.userOrAdminRoleAuth, payment_controller_1.getPayment);
// create a user 
exports.paymentRouter.post("/payments", (0, zod_validator_1.zValidator)('json', validators_1.paymentSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), payment_controller_1.createPayment);
//update a user
exports.paymentRouter.put("/payments/:id", payment_controller_1.updatePayment);
exports.paymentRouter.delete("/payments/:id", payment_controller_1.deletePayment);
//https:domai.com/api/users?limit=10
