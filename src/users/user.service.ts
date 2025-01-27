import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIUser, TSUser, usersTable, BookingsTable, CustomerSupportTicketsTable } from "../drizzle/schema";

// Function to get a list of users with optional limit and include related bookings and support tickets
export const usersService = async (limit?: number): Promise<TSUser[] | null> => {
    return await db.query.usersTable.findMany({
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
}

// Function to get a user by ID with related bookings and support tickets
export const getUserService = async (id: number): Promise<TSUser | undefined> => {
    return await db.query.usersTable.findFirst({
        where: eq(usersTable.userId, id),
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
}

// Function to create a new user
export const createUserService = async (user: TIUser): Promise<string> => {
    await db.insert(usersTable).values(user);
    return "User created successfully";
}

// Function to update an existing user by ID
export const updateUserService = async (id: number, user: TIUser): Promise<string> => {
    await db.update(usersTable).set(user).where(eq(usersTable.userId, id));
    return "User updated successfully";
}

// Function to delete a user by ID
export const deleteUserService = async (id: number): Promise<string> => {
    await db.delete(usersTable).where(eq(usersTable.userId, id));
    return "User deleted successfully";
}
