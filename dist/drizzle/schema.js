"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fleetManagementRelations = exports.FleetManagementTable = exports.locationAndBranchesRelations = exports.LocationAndBranchesTable = exports.customerSupportTicketsRelations = exports.CustomerSupportTicketsTable = exports.ticketStatusEnum = exports.paymentsRelations = exports.PaymentsTable = exports.paymentStatusEnum = exports.bookingsRelations = exports.BookingsTable = exports.bookingStatusEnum = exports.vehicleSpecificationsRelations = exports.VehicleSpecificationsTable = exports.vehiclesRelations = exports.VehiclesTable = exports.authenticationRelations = exports.AuthenticationTable = exports.usersRelations = exports.usersTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const rolesEnum = (0, pg_core_1.pgEnum)('roles', ['user', 'admin']);
exports.usersTable = (0, pg_core_1.pgTable)('users', {
    userId: (0, pg_core_1.serial)('user_id').primaryKey(),
    fullName: (0, pg_core_1.varchar)('full_name', { length: 255 }),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).unique(),
    contactPhone: (0, pg_core_1.varchar)('contact_phone', { length: 15 }),
    address: (0, pg_core_1.varchar)('address', { length: 255 }),
    role: rolesEnum('role').default('user'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().$onUpdateFn(() => new Date()),
    profilePicture: (0, pg_core_1.varchar)('profile_picture', { length: 255 })
});
// User Relations
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.usersTable, ({ one, many }) => ({
    profile: one(exports.AuthenticationTable, {
        fields: [exports.usersTable.userId],
        references: [exports.AuthenticationTable.userId]
    }),
    bookings: many(exports.BookingsTable),
    customerSupportTickets: many(exports.CustomerSupportTicketsTable),
}));
// Authentication Table
exports.AuthenticationTable = (0, pg_core_1.pgTable)("authentication", {
    authId: (0, pg_core_1.serial)("auth_id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.usersTable.userId, { onDelete: "cascade" }),
    email: (0, pg_core_1.varchar)("email", { length: 256 }).unique().notNull().references(() => exports.usersTable.email, { onDelete: "cascade" }),
    role: rolesEnum("role").default("user"),
    password: (0, pg_core_1.varchar)("password", { length: 256 }),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow()
});
// Authentication Relations
exports.authenticationRelations = (0, drizzle_orm_1.relations)(exports.AuthenticationTable, ({ one }) => ({
    users: one(exports.usersTable, {
        fields: [exports.AuthenticationTable.userId],
        references: [exports.usersTable.userId]
    }),
}));
// Vehicles Table
exports.VehiclesTable = (0, pg_core_1.pgTable)("vehicles", {
    vehicleSpecId: (0, pg_core_1.serial)("vehicle_spec_id").primaryKey(),
    vehicleId: (0, pg_core_1.integer)("vehicle_id").notNull().references(() => exports.VehicleSpecificationsTable.vehicleId, { onDelete: "cascade" }),
    rentalRate: (0, pg_core_1.integer)("rental_rate"),
    availability: (0, pg_core_1.varchar)("availability"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().$onUpdateFn(() => new Date()),
    vehicleImage: (0, pg_core_1.varchar)("vehicle_image", { length: 255 })
});
// Vehicle Relations
exports.vehiclesRelations = (0, drizzle_orm_1.relations)(exports.VehiclesTable, ({ one, many }) => ({
    vehicleSpecifications: one(exports.VehicleSpecificationsTable, {
        fields: [exports.VehiclesTable.vehicleId],
        references: [exports.VehicleSpecificationsTable.vehicleId]
    }),
    bookings: many(exports.BookingsTable),
    fleetManagement: many(exports.FleetManagementTable),
    payments: many(exports.PaymentsTable),
}));
// Vehicle Specifications Table
exports.VehicleSpecificationsTable = (0, pg_core_1.pgTable)("vehicle_specifications", {
    vehicleId: (0, pg_core_1.serial)("vehicle_id").primaryKey(),
    manufacturer: (0, pg_core_1.varchar)("manufacturer", { length: 256 }),
    model: (0, pg_core_1.varchar)("model", { length: 256 }),
    year: (0, pg_core_1.integer)("year"),
    fuelType: (0, pg_core_1.varchar)("fuel_type", { length: 50 }),
    engineCapacity: (0, pg_core_1.varchar)("engine_capacity", { length: 50 }),
    transmission: (0, pg_core_1.varchar)("transmission", { length: 50 }),
    seatingCapacity: (0, pg_core_1.integer)("seating_capacity"),
    color: (0, pg_core_1.varchar)("color", { length: 50 }),
    features: (0, pg_core_1.text)("features"),
});
// Vehicle Specifications Relations
exports.vehicleSpecificationsRelations = (0, drizzle_orm_1.relations)(exports.VehicleSpecificationsTable, ({ one }) => ({
    vehicle: one(exports.VehiclesTable, {
        fields: [exports.VehicleSpecificationsTable.vehicleId],
        references: [exports.VehiclesTable.vehicleId]
    }),
}));
exports.bookingStatusEnum = (0, pg_core_1.pgEnum)("booking_status", ["Pending", "Confirmed", "Cancelled"]);
// Bookings Table
exports.BookingsTable = (0, pg_core_1.pgTable)("bookings", {
    bookingId: (0, pg_core_1.serial)("booking_id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.usersTable.userId, { onDelete: "cascade" }),
    vehicleId: (0, pg_core_1.integer)("vehicle_id").notNull().references(() => exports.VehiclesTable.vehicleSpecId, { onDelete: "cascade" }),
    locationId: (0, pg_core_1.integer)("location_id").notNull().references(() => exports.LocationAndBranchesTable.locationId, { onDelete: "cascade" }),
    bookingDate: (0, pg_core_1.timestamp)("booking_date").defaultNow(),
    returnDate: (0, pg_core_1.timestamp)("return_date"),
    totalAmount: (0, pg_core_1.varchar)("total_amount"),
    bookingStatus: (0, exports.bookingStatusEnum)("booking_status").default("Pending"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});
exports.bookingsRelations = (0, drizzle_orm_1.relations)(exports.BookingsTable, ({ one }) => ({
    payments: one(exports.PaymentsTable, {
        fields: [exports.BookingsTable.bookingId],
        references: [exports.PaymentsTable.bookingId]
    }),
    user: one(exports.usersTable, {
        fields: [exports.BookingsTable.userId], // Assuming bookingsTable has a userId field
        references: [exports.usersTable.userId]
    })
}));
exports.paymentStatusEnum = (0, pg_core_1.pgEnum)("payment_status", ["Pending", "Completed", "Failed"]);
// Payments Table
exports.PaymentsTable = (0, pg_core_1.pgTable)("payments", {
    paymentId: (0, pg_core_1.serial)("payment_id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.usersTable.userId, { onDelete: "cascade" }),
    bookingId: (0, pg_core_1.integer)("booking_id").notNull().references(() => exports.BookingsTable.bookingId, { onDelete: "cascade" }),
    amount: (0, pg_core_1.varchar)("amount"),
    paymentStatus: (0, exports.paymentStatusEnum)("payment_status").default("Pending"),
    paymentDate: (0, pg_core_1.timestamp)("payment_date").defaultNow(),
    paymentMethod: (0, pg_core_1.varchar)("payment_method", { length: 50 }),
    transactionId: (0, pg_core_1.varchar)("transaction_id", { length: 256 }),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});
// Payments Relations
exports.paymentsRelations = (0, drizzle_orm_1.relations)(exports.PaymentsTable, ({ one }) => ({
    booking: one(exports.BookingsTable, {
        fields: [exports.PaymentsTable.bookingId],
        references: [exports.BookingsTable.bookingId]
    }),
    user: one(exports.usersTable, {
        fields: [exports.PaymentsTable.userId],
        references: [exports.usersTable.userId]
    }),
}));
exports.ticketStatusEnum = (0, pg_core_1.pgEnum)("status", ["Open", "In Progress", "Resolved", "Closed"]);
// Customer Support Tickets Table
exports.CustomerSupportTicketsTable = (0, pg_core_1.pgTable)("customer_support_tickets", {
    ticketId: (0, pg_core_1.serial)("ticket_id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.usersTable.userId, { onDelete: "cascade" }),
    subject: (0, pg_core_1.varchar)("subject", { length: 256 }),
    description: (0, pg_core_1.text)("description"),
    status: (0, exports.ticketStatusEnum)("status"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});
// Customer Support Tickets Relations
exports.customerSupportTicketsRelations = (0, drizzle_orm_1.relations)(exports.CustomerSupportTicketsTable, ({ one }) => ({
    user: one(exports.usersTable, {
        fields: [exports.CustomerSupportTicketsTable.userId],
        references: [exports.usersTable.userId]
    }),
}));
// Location and Branches Table
exports.LocationAndBranchesTable = (0, pg_core_1.pgTable)("location_and_branches", {
    locationId: (0, pg_core_1.serial)("location_id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 256 }),
    address: (0, pg_core_1.varchar)("address", { length: 512 }),
    contactPhone: (0, pg_core_1.varchar)("contact_phone", { length: 15 }),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});
// Location and Branches Relations
exports.locationAndBranchesRelations = (0, drizzle_orm_1.relations)(exports.LocationAndBranchesTable, ({ one }) => ({
    bookings: one(exports.BookingsTable, {
        fields: [exports.LocationAndBranchesTable.locationId],
        references: [exports.BookingsTable.locationId]
    }),
}));
//Fleet Management Table
exports.FleetManagementTable = (0, pg_core_1.pgTable)("fleet_management", {
    fleetId: (0, pg_core_1.serial)("fleet_id").primaryKey(),
    vehicleId: (0, pg_core_1.integer)("vehicle_id").notNull().references(() => exports.VehiclesTable.vehicleSpecId, { onDelete: "cascade" }),
    acquisitionDate: (0, pg_core_1.timestamp)("acquisition_date"),
    depreciationRate: (0, pg_core_1.varchar)("depreciation_rate"),
    currentValue: (0, pg_core_1.varchar)("current_value"),
    maintenanceCost: (0, pg_core_1.varchar)("maintenance_cost"),
    status: (0, pg_core_1.varchar)("status", { length: 50 }),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().$onUpdateFn(() => new Date()),
});
// Fleet Management Relations
exports.fleetManagementRelations = (0, drizzle_orm_1.relations)(exports.FleetManagementTable, ({ one }) => ({
    vehicle: one(exports.VehiclesTable, {
        fields: [exports.FleetManagementTable.vehicleId],
        references: [exports.VehiclesTable.vehicleSpecId]
    }),
}));
