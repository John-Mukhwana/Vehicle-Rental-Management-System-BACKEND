// import db from "../drizzle/db";
// import { BookingsTable, PaymentsTable } from "../drizzle/schema";
// import Stripe from "stripe";
// import dotenv from 'dotenv/config';
// import { eq } from "drizzle-orm";
// const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY as string, {
//     apiVersion: '2024-06-20',
// });
// export const createCheckoutSession = async (amount: number, currency: string, bookingId: number) => {
//     // Check if the bookingId exists in the BookingsTable
//     const booking = await db.query.BookingsTable.findFirst({
//         where: eq(BookingsTable.bookingId, bookingId),
//     });
//     if (!booking) {
//         throw new Error(`Booking with ID ${bookingId} not found`);
//     }
//     // Create a checkout session
//     const session = await stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: [
//             {
//                 price_data: {
//                     currency: currency,
//                     product_data: {
//                         name: 'Nazarene Vehicle rental',
//                     },
//                     unit_amount: Math.round(amount * 100), // Amount in cents
//                 },
//                 quantity: 1,
//             },
//         ],
//         mode: 'payment',
//         success_url: `http://localhost:5173/current-bookings?session_id={CHECKOUT_SESSION_ID}`, // Update URL with session ID placeholder
//         cancel_url: 'http://localhost:5173/current-bookings',
//         metadata: {
//             bookingId: bookingId.toString(), // Add bookingId to metadata
//         }
//     });
//     // Insert payment record with 'Pending' status
//     await db.insert(PaymentsTable).values({
//         userId: booking.userId, // Adjust to reflect the actual userId from the booking
//         bookingId,
//         amount: amount.toString(),
//         paymentStatus: 'Pending',
//         paymentMethod: 'card',
//         transactionId: session.id,
//     }).execute();
//     // Update the booking with the total amount
//     await db.update(BookingsTable).set({
//         totalAmount: amount.toString(), // Ensure the bookings table has a totalAmount field
//     }).where(eq(BookingsTable.bookingId, bookingId)).execute();
//     return session;
// };
// export const updateBookingStatus = async (bookingId: number, status: 'Pending' | 'Confirmed' | 'Cancelled') => {
//     await db.update(BookingsTable).set({
//         bookingStatus: status
//     }).where(eq(BookingsTable.bookingId, bookingId)).execute();
// };
import db from "../drizzle/db";
import { BookingsTable, PaymentsTable } from "../drizzle/schema";
import Stripe from "stripe";
import { eq } from "drizzle-orm";
const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY, {
    apiVersion: '2024-06-20',
});
export const createCheckoutSession = async (amount, currency, bookingId) => {
    // Check if the bookingId exists in the BookingsTable
    const booking = await db.query.BookingsTable.findFirst({
        where: eq(BookingsTable.bookingId, bookingId),
    });
    if (!booking) {
        throw new Error(`Booking with ID ${bookingId} not found`);
    }
    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: currency,
                    product_data: {
                        name: 'The EXOTravel ',
                    },
                    unit_amount: Math.round(amount * 100), // Amount in cents
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `http://localhost:5173/current-bookings?session_id={CHECKOUT_SESSION_ID}`, // Update URL with session ID placeholder
        cancel_url: 'http://localhost:5173/current-bookings',
        metadata: {
            bookingId: bookingId.toString(), // Add bookingId to metadata
        }
    });
    // Insert payment record with 'Pending' status
    await db.insert(PaymentsTable).values({
        userId: booking.userId, // Adjust to reflect the actual userId from the booking
        bookingId,
        amount: amount.toString(),
        paymentStatus: 'Pending',
        paymentMethod: 'card',
        transactionId: session.id,
    }).execute();
    // Update the booking with the total amount
    await db.update(BookingsTable).set({
        totalAmount: amount.toString(), // Ensure the bookings table has a totalAmount field
    }).where(eq(BookingsTable.bookingId, bookingId)).execute();
    return session;
};
export const updateBookingStatus = async (bookingId, status) => {
    await db.update(BookingsTable).set({
        bookingStatus: status
    }).where(eq(BookingsTable.bookingId, bookingId)).execute();
};
