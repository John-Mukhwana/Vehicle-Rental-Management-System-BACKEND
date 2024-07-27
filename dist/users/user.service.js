"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = exports.updateUserService = exports.createUserService = exports.getUserService = exports.usersService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
// Function to get a list of users with optional limit and include related bookings and support tickets
const usersService = async (limit) => {
    return await db_1.default.query.usersTable.findMany({
        limit: limit,
        with: {
            customerSupportTickets: {
                columns: {
                    ticketId: true,
                    subject: true,
                    description: true,
                    status: true
                }
            }
        }
    });
};
exports.usersService = usersService;
// Function to get a user by ID with related bookings and support tickets
const getUserService = async (id) => {
    return await db_1.default.query.usersTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.usersTable.userId, id),
        with: {
            customerSupportTickets: {
                columns: {
                    ticketId: true,
                    subject: true,
                    description: true,
                    status: true
                }
            }
        }
    });
};
exports.getUserService = getUserService;
// Function to create a new user
const createUserService = async (user) => {
    await db_1.default.insert(schema_1.usersTable).values(user);
    return "User created successfully";
};
exports.createUserService = createUserService;
// Function to update an existing user by ID
const updateUserService = async (id, user) => {
    await db_1.default.update(schema_1.usersTable).set(user).where((0, drizzle_orm_1.eq)(schema_1.usersTable.userId, id));
    return "User updated successfully";
};
exports.updateUserService = updateUserService;
// Function to delete a user by ID
const deleteUserService = async (id) => {
    await db_1.default.delete(schema_1.usersTable).where((0, drizzle_orm_1.eq)(schema_1.usersTable.userId, id));
    return "User deleted successfully";
};
exports.deleteUserService = deleteUserService;
