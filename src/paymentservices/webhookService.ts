

// backend/src/services/webhookService.ts
import stripe from '../utils/stripe';
import  db  from '../drizzle/db';
import { eq } from 'drizzle-orm';
import { PaymentsTable, BookingsTable } from '../drizzle/schema';

export const handlePaymentSucceeded = async (paymentIntent: any) => {
  // Update the payment status to 'Paid' in the PaymentsTable
  await db.update(PaymentsTable).set({
    paymentStatus: 'Completed',
    paymentDate: new Date(),
  }).where(eq(PaymentsTable.transactionId, paymentIntent.id));

  // Retrieve bookingId from paymentIntent metadata
  const bookingId = paymentIntent.metadata.bookingId;

  // Update the total amount and booking status in the BookingsTable
  await db.update(BookingsTable).set({
    totalAmount: (paymentIntent.amount / 100).toString(), // Convert cents to dollars
    bookingStatus: 'Confirmed',
  }).where(eq(BookingsTable.bookingId, bookingId));
};
