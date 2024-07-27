import { pgTable, serial, text, varchar, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
const rolesEnum = pgEnum('roles', ['user', 'admin']);
export const usersTable = pgTable('users', {
    userId: serial('user_id').primaryKey(),
    fullName: varchar('full_name', { length: 255 }),
    email: varchar('email', { length: 255 }).unique(),
    contactPhone: varchar('contact_phone', { length: 15 }),
    address: varchar('address', { length: 255 }),
    role: rolesEnum('role').default('user'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()),
    profilePicture: varchar('profile_picture', { length: 255 })
});
// User Relations
export const usersRelations = relations(usersTable, ({ one, many }) => ({
    profile: one(AuthenticationTable, {
        fields: [usersTable.userId],
        references: [AuthenticationTable.userId]
    }),
    bookings: many(BookingsTable),
    customerSupportTickets: many(CustomerSupportTicketsTable),
}));
// Authentication Table
export const AuthenticationTable = pgTable("authentication", {
    authId: serial("auth_id").primaryKey(),
    userId: integer("user_id").notNull().references(() => usersTable.userId, { onDelete: "cascade" }),
    email: varchar("email", { length: 256 }).unique().notNull().references(() => usersTable.email, { onDelete: "cascade" }),
    role: rolesEnum("role").default("user"),
    password: varchar("password", { length: 256 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});
// Authentication Relations
export const authenticationRelations = relations(AuthenticationTable, ({ one }) => ({
    users: one(usersTable, {
        fields: [AuthenticationTable.userId],
        references: [usersTable.userId]
    }),
}));
// Vehicles Table
export const VehiclesTable = pgTable("vehicles", {
    vehicleSpecId: serial("vehicle_spec_id").primaryKey(),
    vehicleId: integer("vehicle_id").notNull().references(() => VehicleSpecificationsTable.vehicleId, { onDelete: "cascade" }),
    rentalRate: integer("rental_rate"),
    availability: varchar("availability"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
    vehicleImage: varchar("vehicle_image", { length: 255 })
});
// Vehicle Relations
export const vehiclesRelations = relations(VehiclesTable, ({ one, many }) => ({
    vehicleSpecifications: one(VehicleSpecificationsTable, {
        fields: [VehiclesTable.vehicleId],
        references: [VehicleSpecificationsTable.vehicleId]
    }),
    bookings: many(BookingsTable),
    fleetManagement: many(FleetManagementTable),
    payments: many(PaymentsTable),
}));
// Vehicle Specifications Table
export const VehicleSpecificationsTable = pgTable("vehicle_specifications", {
    vehicleId: serial("vehicle_id").primaryKey(),
    manufacturer: varchar("manufacturer", { length: 256 }),
    model: varchar("model", { length: 256 }),
    year: integer("year"),
    fuelType: varchar("fuel_type", { length: 50 }),
    engineCapacity: varchar("engine_capacity", { length: 50 }),
    transmission: varchar("transmission", { length: 50 }),
    seatingCapacity: integer("seating_capacity"),
    color: varchar("color", { length: 50 }),
    features: text("features"),
});
// Vehicle Specifications Relations
export const vehicleSpecificationsRelations = relations(VehicleSpecificationsTable, ({ one }) => ({
    vehicle: one(VehiclesTable, {
        fields: [VehicleSpecificationsTable.vehicleId],
        references: [VehiclesTable.vehicleId]
    }),
}));
export const bookingStatusEnum = pgEnum("booking_status", ["Pending", "Confirmed", "Cancelled"]);
// Bookings Table
export const BookingsTable = pgTable("bookings", {
    bookingId: serial("booking_id").primaryKey(),
    userId: integer("user_id").notNull().references(() => usersTable.userId, { onDelete: "cascade" }),
    vehicleId: integer("vehicle_id").notNull().references(() => VehiclesTable.vehicleSpecId, { onDelete: "cascade" }),
    locationId: integer("location_id").notNull().references(() => LocationAndBranchesTable.locationId, { onDelete: "cascade" }),
    bookingDate: timestamp("booking_date").defaultNow(),
    returnDate: timestamp("return_date"),
    totalAmount: varchar("total_amount"),
    bookingStatus: bookingStatusEnum("booking_status").default("Pending"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});
export const bookingsRelations = relations(BookingsTable, ({ one }) => ({
    payments: one(PaymentsTable, {
        fields: [BookingsTable.bookingId],
        references: [PaymentsTable.bookingId]
    }),
    user: one(usersTable, {
        fields: [BookingsTable.userId], // Assuming bookingsTable has a userId field
        references: [usersTable.userId]
    })
}));
export const paymentStatusEnum = pgEnum("payment_status", ["Pending", "Completed", "Failed"]);
// Payments Table
export const PaymentsTable = pgTable("payments", {
    paymentId: serial("payment_id").primaryKey(),
    userId: integer("user_id").notNull().references(() => usersTable.userId, { onDelete: "cascade" }),
    bookingId: integer("booking_id").notNull().references(() => BookingsTable.bookingId, { onDelete: "cascade" }),
    amount: varchar("amount"),
    paymentStatus: paymentStatusEnum("payment_status").default("Pending"),
    paymentDate: timestamp("payment_date").defaultNow(),
    paymentMethod: varchar("payment_method", { length: 50 }),
    transactionId: varchar("transaction_id", { length: 256 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});
// Payments Relations
export const paymentsRelations = relations(PaymentsTable, ({ one }) => ({
    booking: one(BookingsTable, {
        fields: [PaymentsTable.bookingId],
        references: [BookingsTable.bookingId]
    }),
    user: one(usersTable, {
        fields: [PaymentsTable.userId],
        references: [usersTable.userId]
    }),
}));
export const ticketStatusEnum = pgEnum("status", ["Open", "In Progress", "Resolved", "Closed"]);
// Customer Support Tickets Table
export const CustomerSupportTicketsTable = pgTable("customer_support_tickets", {
    ticketId: serial("ticket_id").primaryKey(),
    userId: integer("user_id").notNull().references(() => usersTable.userId, { onDelete: "cascade" }),
    subject: varchar("subject", { length: 256 }),
    description: text("description"),
    status: ticketStatusEnum("status"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});
// Customer Support Tickets Relations
export const customerSupportTicketsRelations = relations(CustomerSupportTicketsTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [CustomerSupportTicketsTable.userId],
        references: [usersTable.userId]
    }),
}));
// Location and Branches Table
export const LocationAndBranchesTable = pgTable("location_and_branches", {
    locationId: serial("location_id").primaryKey(),
    name: varchar("name", { length: 256 }),
    address: varchar("address", { length: 512 }),
    contactPhone: varchar("contact_phone", { length: 15 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});
// Location and Branches Relations
export const locationAndBranchesRelations = relations(LocationAndBranchesTable, ({ one }) => ({
    bookings: one(BookingsTable, {
        fields: [LocationAndBranchesTable.locationId],
        references: [BookingsTable.locationId]
    }),
}));
//Fleet Management Table
export const FleetManagementTable = pgTable("fleet_management", {
    fleetId: serial("fleet_id").primaryKey(),
    vehicleId: integer("vehicle_id").notNull().references(() => VehiclesTable.vehicleSpecId, { onDelete: "cascade" }),
    acquisitionDate: timestamp("acquisition_date"),
    depreciationRate: varchar("depreciation_rate"),
    currentValue: varchar("current_value"),
    maintenanceCost: varchar("maintenance_cost"),
    status: varchar("status", { length: 50 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});
// Fleet Management Relations
export const fleetManagementRelations = relations(FleetManagementTable, ({ one }) => ({
    vehicle: one(VehiclesTable, {
        fields: [FleetManagementTable.vehicleId],
        references: [VehiclesTable.vehicleSpecId]
    }),
}));
