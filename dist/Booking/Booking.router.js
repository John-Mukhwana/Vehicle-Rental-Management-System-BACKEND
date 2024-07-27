import { Hono } from "hono";
import { listBookings, getBooking, createBooking, updateBooking, deleteBooking } from "./Booking.controller";
import { zValidator } from "@hono/zod-validator";
import { bookingSchema } from "../validators";
import { userOrAdminRoleAuth } from "../middleware/bearAuth";
export const BookingRouter = new Hono();
//get all users      api/users
BookingRouter.get("/bookings", listBookings);
//get a single user    api/users/1
BookingRouter.get("/bookings/:id", userOrAdminRoleAuth, getBooking);
// create a user 
BookingRouter.post("/bookings", zValidator('json', bookingSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createBooking);
//update a user
BookingRouter.put("/bookings/:id", updateBooking);
BookingRouter.delete("/bookings/:id", deleteBooking);
//https:domai.com/api/users?limit=10
