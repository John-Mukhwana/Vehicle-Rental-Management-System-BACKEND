import { z } from 'zod';
export const userSchema = z.object({
    userId: z.number(),
    fullName: z.string(),
    email: z.string(),
    contactPhone: z.string(),
    address: z.string(),
    role: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
});
export const bookingSchema = z.object({
    bookingId: z.number(),
    userId: z.number(),
    vehicleId: z.number(),
    locationId: z.number(),
    bookingDate: z.string(),
    returnDate: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
});
export const vehicleSpecificationSchema = z.object({
    vehicleId: z.number(),
    manufacturer: z.string(),
    model: z.string(),
    year: z.number(),
    fuelType: z.string(),
    engineCapacity: z.string(),
    transmission: z.string(),
    seatingCapacity: z.number(),
    color: z.string(),
    features: z.array(z.string()),
});
export const ticketSchema = z.object({
    ticketId: z.number(),
    userId: z.number(),
    subject: z.string().nullable(),
    description: z.string().nullable(),
    status: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string()
});
export const FleetManagementSchema = z.object({
    fleetId: z.number(),
    vehicleId: z.number(),
    locationId: z.number(),
    depreciationRate: z.string(),
    maintenanceCost: z.string(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
});
export const locationAndBranchesSchema = z.object({
    locationId: z.number(),
    name: z.string(),
    address: z.string(),
    contactPhone: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
});
export const paymentSchema = z.object({
    paymentId: z.number(),
    bookingId: z.number(),
    amount: z.string(),
    paymentDate: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
});
export const vehicleSchema = z.object({
    vehicleId: z.number(),
    vehicleSpecId: z.number(),
    rentalRate: z.string(),
    availability: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
});
export const loginUserSchema = z.object({
    email: z.string(),
    password: z.string()
});
export const registerUserSchema = z.object({
    userId: z.number(),
    fullName: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.string(),
});
