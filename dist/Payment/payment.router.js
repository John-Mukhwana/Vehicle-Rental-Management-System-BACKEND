import { Hono } from "hono";
import { listPayments, getPayment, createPayment, updatePayment, deletePayment } from "./payment.controller";
import { zValidator } from "@hono/zod-validator";
import { paymentSchema } from "../validators";
export const paymentRouter = new Hono();
//get all users      api/users
paymentRouter.get("/payments", listPayments);
//get a single user    api/users/1
paymentRouter.get("/payments/:id", getPayment);
// create a user 
paymentRouter.post("/payments", zValidator('json', paymentSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createPayment);
//update a user
paymentRouter.put("/payments/:id", updatePayment);
paymentRouter.delete("/payments/:id", deletePayment);
//https:domai.com/api/users?limit=10
