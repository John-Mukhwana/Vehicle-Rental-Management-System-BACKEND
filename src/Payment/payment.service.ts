import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIPayment, TSPayment, PaymentsTable } from "../drizzle/schema";

export const paymentService = async (limit?: number): Promise<TSPayment[] | null> => {
    if (limit) {
        return await db.query.PaymentsTable.findMany({
            limit: limit
        });
    }
    return await db.query.PaymentsTable.findMany();
}

export const getPaymentService = async (id: number): Promise<TIPayment | undefined> => {
    return await db.query.PaymentsTable.findFirst({
        where: eq(PaymentsTable.paymentId, id)
    })
}

export const createPaymentService = async (payment: TIPayment) => {
    await db.insert(PaymentsTable).values(payment)
    return "Payment created successfully";
}

export const updatePaymentService = async (id: number, user: TIPayment) => {
    await db.update(PaymentsTable).set(user).where(eq(PaymentsTable.paymentId, id))
    return "Payment updated successfully";
}

export const deletePaymentService = async (id: number) => {
    await db.delete(PaymentsTable).where(eq(PaymentsTable.paymentId, id))
    return "Payment deleted successfully";
}
