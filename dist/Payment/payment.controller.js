"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.updatePayment = exports.createPayment = exports.getPayment = exports.listPayments = void 0;
const payment_service_1 = require("./payment.service");
const listPayments = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, payment_service_1.paymentService)(limit);
        if (data == null || data.length == 0) {
            return c.text("payment not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listPayments = listPayments;
const getPayment = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await (0, payment_service_1.getPaymentService)(id);
    if (user == undefined) {
        return c.text("Payment not found", 404);
    }
    return c.json(user, 200);
};
exports.getPayment = getPayment;
const createPayment = async (c) => {
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
        const createdPayment = await (0, payment_service_1.createPaymentService)(payment);
        if (!createdPayment)
            return c.text("Payment not created", 404);
        return c.json({ msg: createdPayment }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createPayment = createPayment;
const updatePayment = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
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
        const searchedPayment = await (0, payment_service_1.getPaymentService)(id);
        if (searchedPayment == undefined)
            return c.text("Paymnent not found", 404);
        // get the data and update it
        const res = await (0, payment_service_1.updatePaymentService)(id, payment);
        // return a success message
        if (!res)
            return c.text("Payment not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updatePayment = updatePayment;
const deletePayment = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const payment = await (0, payment_service_1.getPaymentService)(id);
        if (payment == undefined)
            return c.text("User not found", 404);
        //deleting the user
        const res = await (0, payment_service_1.deletePaymentService)(id);
        if (!res)
            return c.text("Payment not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deletePayment = deletePayment;
