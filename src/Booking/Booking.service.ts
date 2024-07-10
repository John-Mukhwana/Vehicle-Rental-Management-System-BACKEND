import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIBooking, TSBooking, BookingsTable } from "../drizzle/schema";

export const bookingService = async (limit?: number): Promise<TSBooking[] | null> => {
    if (limit) {
        return await db.query.BookingsTable.findMany({
            limit: limit
        });
    }
    return await db.query.BookingsTable.findMany();
}

export const getBookingService = async (id: number): Promise<TIBooking | undefined> => {
    return await db.query.BookingsTable.findFirst({
        where: eq(BookingsTable.bookingId, id)
    })
}

export const createBookingService = async (Booking: TIBooking) => {
    await db.insert(BookingsTable).values(Booking)
    return "Booking created successfully";
}

export const updateBookingService = async (id: number, Booking: TIBooking) => {
    await db.update(BookingsTable).set(Booking).where(eq(BookingsTable.bookingId, id))
    return "Booking updated successfully";
}

export const deleteBookingService = async (id: number) => {
    await db.delete(BookingsTable).where(eq(BookingsTable.bookingId, id))
    return "Booking deleted successfully";
}
