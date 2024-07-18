// backend/src/services/paymentService.ts
import stripe from '../utils/stripe';
import db  from '../drizzle/db';
import { PaymentsTable, BookingsTable } from '../drizzle/schema';

export const createPaymentIntent = async (paymentData: any) => {
  const { amount, currency, userId, vehicleId, locationId, bookingDate, returnDate } = paymentData;

  // Save initial booking details in the BookingsTable
  const booking = await db.insert(BookingsTable).values({
    userId,
    vehicleId,
    locationId,
    bookingDate,
    returnDate,
    totalAmount: amount.toString(),
    bookingStatus: 'Pending',
  }).returning();
  
  const bookingId = booking[0].bookingId;

  // Create a payment intent with the specified amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount, // Amount in cents
    currency,
    metadata: { bookingId },
  });

  // Save initial payment details in the PaymentsTable
  await db.insert(PaymentsTable).values({
    bookingId,
    amount: amount.toString(),
    paymentStatus: 'Pending',
    paymentMethod: 'card',
    transactionId: paymentIntent.id,
  });

  return { clientSecret: paymentIntent.client_secret };
};
