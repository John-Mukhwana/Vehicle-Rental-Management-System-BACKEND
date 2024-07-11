import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { PaymentsTable } from "../drizzle/schema";
export const paymentService = async (limit) => {
    if (limit) {
        return await db.query.PaymentsTable.findMany({
            limit: limit
        });
    }
    return await db.query.PaymentsTable.findMany();
};
export const getPaymentService = async (id) => {
    return await db.query.PaymentsTable.findFirst({
        where: eq(PaymentsTable.paymentId, id)
    });
};
export const createPaymentService = async (payment) => {
    await db.insert(PaymentsTable).values(payment);
    return "Payment created successfully";
};
export const updatePaymentService = async (id, user) => {
    await db.update(PaymentsTable).set(user).where(eq(PaymentsTable.paymentId, id));
    return "Payment updated successfully";
};
export const deletePaymentService = async (id) => {
    await db.delete(PaymentsTable).where(eq(PaymentsTable.paymentId, id));
    return "Payment deleted successfully";
};
