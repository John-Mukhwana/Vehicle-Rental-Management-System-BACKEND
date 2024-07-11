import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { usersTable } from "../drizzle/schema";
export const usersService = async (limit) => {
    if (limit) {
        return await db.query.usersTable.findMany({
            limit: limit
        });
    }
    return await db.query.usersTable.findMany();
};
export const getUserService = async (id) => {
    return await db.query.usersTable.findFirst({
        where: eq(usersTable.userId, id)
    });
};
export const createUserService = async (user) => {
    await db.insert(usersTable).values(user);
    return "User created successfully";
};
export const updateUserService = async (id, user) => {
    await db.update(usersTable).set(user).where(eq(usersTable.userId, id));
    return "User updated successfully";
};
export const deleteUserService = async (id) => {
    await db.delete(usersTable).where(eq(usersTable.userId, id));
    return "User deleted successfully";
};
