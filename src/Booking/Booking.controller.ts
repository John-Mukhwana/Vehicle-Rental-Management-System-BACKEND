import { Context } from "hono";
import { bookingService, getBookingService, createBookingService, updateBookingService, deleteBookingService } from "./Booking.service";

export const listBookings = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await bookingService(limit);
        if (data == null || data.length == 0) {
            return c.text("Booking not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getBooking = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Booking = await getBookingService(id);
    if (Booking == undefined) {
        return c.text("Booking not found", 404);
    }
    return c.json(Booking, 200);
}
export const createBooking = async (c: Context) => {
    try {
        const Booking = await c.req.json();
        // Convert date strings to Date objects
        if (Booking.createdAt) {
            Booking.createdAt = new Date(Booking.createdAt);
                 }
               if (Booking.updatedAt) {
             Booking.updatedAt = new Date(Booking.updatedAt);
       }
       if (Booking.bookingDate) {
        Booking.bookingDate = new Date(Booking.bookingDate);
       }
       if (Booking.returnDate) {
        Booking.returnDate = new Date(Booking.returnDate);
       }
        const createdBooking = await createBookingService(Booking);


        if (!createdBooking) return c.text("Booking not created", 404);
        return c.json({ msg: createdBooking }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateBooking = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Booking = await c.req.json();
    // Convert date strings to Date objects
    if (Booking.createdAt) {
        Booking.createdAt = new Date(Booking.createdAt);
             }
           if (Booking.updatedAt) {
         Booking.updatedAt = new Date(Booking.updatedAt);
   }
   if (Booking.bookingDate) {
    Booking.bookingDate = new Date(Booking.bookingDate);
   }
   if (Booking.returnDate) {
    Booking.returnDate = new Date(Booking.returnDate);
   }
    try {
        // search for the user
        const searchedBooking = await getBookingService(id);
        if (searchedBooking == undefined) return c.text("Booking not found", 404);
        // get the data and update it
        const res = await updateBookingService(id, Booking);
        // return a success message
        if (!res) return c.text("Booking not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteBooking = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const Booking = await getBookingService(id);
        if (Booking == undefined) return c.text("Booking not found", 404);
        //deleting the user
        const res = await deleteBookingService(id);
        if (!res) return c.text("Booking not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}