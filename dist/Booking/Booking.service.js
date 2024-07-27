"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookingService = exports.updateBookingService = exports.createBookingService = exports.getBookingService = exports.bookingService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const bookingService = async (limit) => {
    if (limit) {
        return await db_1.default.query.BookingsTable.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.BookingsTable.findMany();
};
exports.bookingService = bookingService;
const getBookingService = async (id) => {
    return await db_1.default.query.BookingsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.BookingsTable.bookingId, id)
    });
};
exports.getBookingService = getBookingService;
const createBookingService = async (Booking) => {
    await db_1.default.insert(schema_1.BookingsTable).values(Booking);
    return "Booking created successfully";
};
exports.createBookingService = createBookingService;
const updateBookingService = async (id, Booking) => {
    await db_1.default.update(schema_1.BookingsTable).set(Booking).where((0, drizzle_orm_1.eq)(schema_1.BookingsTable.bookingId, id));
    return "Booking updated successfully";
};
exports.updateBookingService = updateBookingService;
const deleteBookingService = async (id) => {
    await db_1.default.delete(schema_1.BookingsTable).where((0, drizzle_orm_1.eq)(schema_1.BookingsTable.bookingId, id));
    return "Booking deleted successfully";
};
exports.deleteBookingService = deleteBookingService;
