"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserSchema = exports.loginUserSchema = exports.vehicleSchema = exports.paymentSchema = exports.locationAndBranchesSchema = exports.FleetManagementSchema = exports.ticketSchema = exports.vehicleSpecificationSchema = exports.bookingSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    fullName: zod_1.z.string(),
    email: zod_1.z.string(),
    contactPhone: zod_1.z.string(),
    address: zod_1.z.string(),
});
exports.bookingSchema = zod_1.z.object({
    userId: zod_1.z.number().min(1),
    locationId: zod_1.z.number().min(1),
    bookingDate: zod_1.z.string().refine(value => !isNaN(Date.parse(value)), {
        message: "Invalid date format"
    }),
    returnDate: zod_1.z.string().refine(value => !isNaN(Date.parse(value)), {
        message: "Invalid date format"
    }),
    totalAmount: zod_1.z.string().min(1)
});
exports.vehicleSpecificationSchema = zod_1.z.object({
    vehicleId: zod_1.z.number(),
    manufacturer: zod_1.z.string(),
    model: zod_1.z.string(),
    year: zod_1.z.number(),
    fuelType: zod_1.z.string(),
    engineCapacity: zod_1.z.string(),
    transmission: zod_1.z.string(),
    seatingCapacity: zod_1.z.number(),
    color: zod_1.z.string(),
    features: zod_1.z.array(zod_1.z.string()),
});
exports.ticketSchema = zod_1.z.object({
    ticketId: zod_1.z.number(),
    userId: zod_1.z.number(),
    subject: zod_1.z.string().nullable(),
    description: zod_1.z.string().nullable(),
    status: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string()
});
exports.FleetManagementSchema = zod_1.z.object({
    fleetId: zod_1.z.number(),
    vehicleId: zod_1.z.number(),
    locationId: zod_1.z.number(),
    depreciationRate: zod_1.z.string(),
    maintenanceCost: zod_1.z.string(),
    status: zod_1.z.string(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string()
});
exports.locationAndBranchesSchema = zod_1.z.object({
    locationId: zod_1.z.number(),
    name: zod_1.z.string(),
    address: zod_1.z.string(),
    contactPhone: zod_1.z.string(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string()
});
exports.paymentSchema = zod_1.z.object({
    bookingId: zod_1.z.number(),
    amount: zod_1.z.string(),
});
exports.vehicleSchema = zod_1.z.object({
    vehicleId: zod_1.z.number(),
    rentalRate: zod_1.z.number(),
    availability: zod_1.z.string(),
    createdAt: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
    vehicleImage: zod_1.z.string().nullable().optional(),
});
exports.loginUserSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.registerUserSchema = zod_1.z.object({
    fullName: zod_1.z.string(),
    email: zod_1.z.string(),
    password: zod_1.z.string()
});
