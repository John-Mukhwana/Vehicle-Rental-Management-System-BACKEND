import { totalmem } from 'os'
import { z } from 'zod'
import { bookingStatusEnum } from './drizzle/schema'
import { timestamp, integer, serial, varchar } from 'drizzle-orm/pg-core';
import { availableMemory, features } from 'process';

export const userSchema = z.object({
    userId: z.number(),
    fullName: z.string(),
    email: z.string(),
    contactPhone: z.string(),
    address: z.string(),
})

export const bookingSchema = z.object({
    userId: z.number().min(1),
    locationId: z.number().min(1),
    bookingDate: z.string().refine(value => !isNaN(Date.parse(value)), {
      message: "Invalid date format"
    }),
    returnDate: z.string().refine(value => !isNaN(Date.parse(value)), {
      message: "Invalid date format"
    }),
    totalAmount: z.string().min(1)
    
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
})
 
export const ticketSchema = z.object({
  ticketId: z.number(),
  userId: z.number(),
  subject: z.string().nullable(),
  description: z.string().nullable(),
  status: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string()

})

export const FleetManagementSchema = z.object({
    fleetId: z.number(),
    vehicleId: z.number(),
    locationId: z.number(),
    depreciationRate: z.string(),
    maintenanceCost: z.string(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()

})

export const locationAndBranchesSchema = z.object({
    locationId: z.number(),
    name: z.string(),
    address: z.string(),
    contactPhone: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
})

export const paymentSchema = z.object({
    bookingId: z.number(),
    amount: z.string(),
   
})



export const vehicleSchema = z.object({
  vehicleId: z.number(),
  rentalRate: z.number(),
  availability: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  vehicleImage: z.string().nullable().optional(),
});


export const loginUserSchema = z.object({
    email: z.string(),
    password: z.string()
})

export const registerUserSchema = z.object({
    fullName: z.string(),
    email: z.string(),
    password: z.string()
})



