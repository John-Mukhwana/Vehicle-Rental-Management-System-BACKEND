import { Context } from "hono";
import { paymentService, getPaymentService, createPaymentService, updatePaymentService, deletePaymentService } from "./payment.service";

export const listPayments = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await paymentService(limit);
        if (data == null || data.length == 0) {
            return c.text("payment not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getPayment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await getPaymentService(id);
    if (user == undefined) {
        return c.text("Payment not found", 404);
    }
    return c.json(user, 200);
}
export const createPayment = async (c: Context) => {
    try {
        const payment = await c.req.json();
         // Convert date strings to Date objects
            if (payment.createdAt) {
                payment.createdAt = new Date(payment.createdAt);
              }
           if (payment.updatedAt) {
               payment.updatedAt = new Date(payment.updatedAt);
                }
            if (payment.paymentDate) {
                payment.paymentDate = new Date(payment.paymentDate);
            }
        const createdPayment = await createPaymentService(payment);

        if (!createdPayment) return c.text("Payment not created", 404);
        return c.json({ msg: createdPayment }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updatePayment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const payment = await c.req.json();
    // Convert date strings to Date objects
    if (payment.createdAt) {
        payment.createdAt = new Date(payment.createdAt);
      }
   if (payment.updatedAt) {
       payment.updatedAt = new Date(payment.updatedAt);
        }
    try {
        // search for the user
        const searchedPayment = await getPaymentService(id);
        if (searchedPayment == undefined) return c.text("Paymnent not found", 404);
        // get the data and update it
        const res = await updatePaymentService(id, payment);
        // return a success message
        if (!res) return c.text("Payment not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deletePayment = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const payment = await getPaymentService(id);
        if (payment == undefined) return c.text("User not found", 404);
        //deleting the user
        const res = await deletePaymentService(id);
        if (!res) return c.text("Payment not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}