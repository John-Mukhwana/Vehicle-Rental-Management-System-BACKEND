"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBooking = exports.listBookings = void 0;
const Booking_service_1 = require("./Booking.service");
const listBookings = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, Booking_service_1.bookingService)(limit);
        if (data == null || data.length == 0) {
            return c.text("Booking not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listBookings = listBookings;
const getBooking = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const Booking = await (0, Booking_service_1.getBookingService)(id);
    if (Booking == undefined) {
        return c.text("Booking not found", 404);
    }
    return c.json(Booking, 200);
};
exports.getBooking = getBooking;
const createBooking = async (c) => {
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
        const createdBooking = await (0, Booking_service_1.createBookingService)(Booking);
        if (!createdBooking)
            return c.text("Booking not created", 404);
        return c.json({ msg: createdBooking }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createBooking = createBooking;
const updateBooking = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
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
        const searchedBooking = await (0, Booking_service_1.getBookingService)(id);
        if (searchedBooking == undefined)
            return c.text("Booking not found", 404);
        // get the data and update it
        const res = await (0, Booking_service_1.updateBookingService)(id, Booking);
        // return a success message
        if (!res)
            return c.text("Booking not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateBooking = updateBooking;
const deleteBooking = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const Booking = await (0, Booking_service_1.getBookingService)(id);
        if (Booking == undefined)
            return c.text("Booking not found", 404);
        //deleting the user
        const res = await (0, Booking_service_1.deleteBookingService)(id);
        if (!res)
            return c.text("Booking not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteBooking = deleteBooking;
