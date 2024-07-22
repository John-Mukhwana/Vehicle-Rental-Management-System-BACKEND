// // backend/src/services/paymentService.ts
// import stripe from '../utils/stripe';
// import db  from '../drizzle/db';
// import { PaymentsTable, BookingsTable } from '../drizzle/schema';

// export const createPaymentIntent = async (paymentData: any) => {
//   const { amount, currency, userId, vehicleId, locationId, bookingDate, returnDate } = paymentData;

//   // Save initial booking details in the BookingsTable
//   const booking = await db.insert(BookingsTable).values({
//     userId,
//     vehicleId,
//     locationId,
//     bookingDate,
//     returnDate,
//     totalAmount: amount.toString(),
//     bookingStatus: 'Pending',
//   }).returning();
  
//   const bookingId = booking[0].bookingId;

//   // Create a payment intent with the specified amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount, // Amount in cents
//     currency,
//     metadata: { bookingId },
//   });

//   // Save initial payment details in the PaymentsTable
//   await db.insert(PaymentsTable).values({
//     bookingId,
//     amount: amount.toString(),
//     paymentStatus: 'Pending',
//     paymentMethod: 'card',
//     transactionId: paymentIntent.id,
//   });

//   return { clientSecret: paymentIntent.client_secret };
// };
// backend/src/services/paymentService.ts
// import stripe from '../utils/stripe';
// import db from '../drizzle/db';
// import { PaymentsTable, BookingsTable } from '../drizzle/schema';

// export const createPaymentIntent = async (paymentData: any) => {
//   const { amount, currency, userId, vehicleId, locationId, bookingDate, returnDate } = paymentData;

//   // Save initial booking details in the BookingsTable
//   const booking = await db.insert(BookingsTable).values({
//     userId,
//     vehicleId,
//     locationId,
//     bookingDate,
//     returnDate,
//     totalAmount: amount.toString(),
//     bookingStatus: 'Pending',
//   }).returning();

//   const bookingId = booking[0].bookingId;

//   // Create a payment intent with the specified amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount, // Amount in cents
//     currency,
//     metadata: { bookingId },
//   });

//   // Save initial payment details in the PaymentsTable
//   await db.insert(PaymentsTable).values({
//     bookingId,
//     amount: amount.toString(),
//     paymentStatus: 'Pending',
//     paymentMethod: 'card', // Adjust based on your payment method
//     transactionId: paymentIntent.id,
//   });

//   return { clientSecret: paymentIntent.client_secret };
// };

// // Function to update payment details
// export const updatePaymentDetails = async (paymentDetails: any) => {
//   const { paymentId, amount, paymentDate, createdAt, updatedAt } = paymentDetails;

//   // Update the payment details in the PaymentsTable
//   await db.update(PaymentsTable)
//     .set({
//       amount: amount.toString(),
//       paymentStatus: 'Completed', // Update the status as needed
//       paymentDate,
//       createdAt,
//       updatedAt,
//     })
//     // Use the correct column for the unique identifier

//   return { success: true };
// };

import stripe from '../utils/stripe';
import db from '../drizzle/db';
import { PaymentsTable, BookingsTable } from '../drizzle/schema';

export const createPaymentIntent = async (paymentData: any) => {
  const { amount, currency, userId, vehicleId, locationId, bookingDate, returnDate } = paymentData;

  const amountInCents = Math.round(parseFloat(amount) * 100);

  // Create a payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency,
    metadata: { userId, vehicleId, locationId },
  });

  // Save payment intent details in the database
  const booking = await db.insert(BookingsTable).values({
    userId,
    vehicleId,
    locationId,
    bookingDate,
    returnDate,
    totalAmount: amountInCents.toString(),
    bookingStatus: 'Pending',
  }).returning();

  await db.insert(PaymentsTable).values({
    bookingId: booking[0].bookingId,
    amount: amountInCents.toString(),
    paymentStatus: 'Pending',
    paymentMethod: 'card',
    transactionId: paymentIntent.id,
  });

  return { clientSecret: paymentIntent.client_secret };
};
