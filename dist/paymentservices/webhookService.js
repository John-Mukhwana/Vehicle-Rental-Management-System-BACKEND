"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePaymentSucceeded = void 0;
const db_1 = __importDefault(require("../drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
const handlePaymentSucceeded = async (paymentIntent) => {
    // Update the payment status to 'Paid' in the PaymentsTable
    await db_1.default.update(schema_1.PaymentsTable).set({
        paymentStatus: 'Completed',
        paymentDate: new Date(),
    }).where((0, drizzle_orm_1.eq)(schema_1.PaymentsTable.transactionId, paymentIntent.id));
    // Retrieve bookingId from paymentIntent metadata
    const bookingId = paymentIntent.metadata.bookingId;
    // Update the total amount and booking status in the BookingsTable
    await db_1.default.update(schema_1.BookingsTable).set({
        totalAmount: (paymentIntent.amount / 100).toString(), // Convert cents to dollars
        bookingStatus: 'Confirmed',
    }).where((0, drizzle_orm_1.eq)(schema_1.BookingsTable.bookingId, bookingId));
};
exports.handlePaymentSucceeded = handlePaymentSucceeded;
