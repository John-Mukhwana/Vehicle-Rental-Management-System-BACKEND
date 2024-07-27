"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRouter = void 0;
const hono_1 = require("hono");
const Booking_controller_1 = require("./Booking.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const bearAuth_1 = require("../middleware/bearAuth");
exports.BookingRouter = new hono_1.Hono();
//get all users      api/users
exports.BookingRouter.get("/bookings", Booking_controller_1.listBookings);
//get a single user    api/users/1
exports.BookingRouter.get("/bookings/:id", bearAuth_1.userOrAdminRoleAuth, Booking_controller_1.getBooking);
// create a user 
exports.BookingRouter.post("/bookings", (0, zod_validator_1.zValidator)('json', validators_1.bookingSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), Booking_controller_1.createBooking);
//update a user
exports.BookingRouter.put("/bookings/:id", Booking_controller_1.updateBooking);
exports.BookingRouter.delete("/bookings/:id", Booking_controller_1.deleteBooking);
//https:domai.com/api/users?limit=10
