import { eq, sql } from "drizzle-orm";
import db from "../drizzle/db";
import { AuthenticationTable } from '../drizzle/schema';
export const authenticationService = async (limit) => {
    if (limit) {
        return await db.query.AuthenticationTable.findMany({
            limit: limit
        });
    }
    return await db.query.AuthenticationTable.findMany();
};
export const getAuthenticationService = async (id) => {
    return await db.query.AuthenticationTable.findFirst({
        where: eq(AuthenticationTable.authId, id)
    });
};
export const createAuthenticationService = async (authentication) => {
    await db.insert(AuthenticationTable).values(authentication);
    return "Authentication created successfully";
};
export const updateAuthenticationService = async (id, authentication) => {
    await db.update(AuthenticationTable).set(authentication).where(eq(AuthenticationTable.authId, id));
    return "Athentication updated successfully";
};
export const deleteAuthenticationService = async (id) => {
    await db.delete(AuthenticationTable).where(eq(AuthenticationTable.authId, id));
    return "Authentication deleted successfully";
};
//For user registration
export const createAuthUserService = async (user) => {
    await db.insert(AuthenticationTable).values(user);
    return "User Registered successfully";
};
//For user login
export const userLoginService = async (user) => {
    const { email, password, role } = user;
    return await db.query.AuthenticationTable.findFirst({
        columns: {
            email: true,
            role: true,
            password: true
        }, where: sql ` ${AuthenticationTable.email} = ${email}`,
        with: {
            users: {
                columns: {
                    fullName: true,
                    contactPhone: true,
                    address: true,
                    userId: true
                }
            }
        }
    });
};
