import { eq, sql } from "drizzle-orm";
import db from "../drizzle/db";
import { TIAuthentication, TSAuthentication, AuthenticationTable } from '../drizzle/schema';

export const authenticationService = async (limit?: number): Promise<TSAuthentication[] | null> => {
    if (limit) {
        return await db.query.AuthenticationTable.findMany({
            limit: limit
        });
    }
    return await db.query.AuthenticationTable.findMany();
}

export const getAuthenticationService = async (id: number): Promise<TIAuthentication | undefined> => {
    return await db.query.AuthenticationTable.findFirst({
        where: eq(AuthenticationTable.authId, id)
    })
}

export const createAuthenticationService = async (authentication: TIAuthentication) => {
    await db.insert(AuthenticationTable).values(authentication)
    return "Authentication created successfully";
}

export const updateAuthenticationService = async (id: number, authentication: TIAuthentication) => {
    await db.update(AuthenticationTable).set(authentication).where(eq(AuthenticationTable.authId, id))
    return "Athentication updated successfully";
}

export const deleteAuthenticationService = async (id: number) => {
    await db.delete(AuthenticationTable).where(eq(AuthenticationTable.authId, id))
    return "Authentication deleted successfully";
}

//For user registration

export const createAuthUserService = async (user: TIAuthentication): Promise<string | null> => {
    await db.insert(AuthenticationTable).values(user)
    return "User created successfully";
}

export const userLoginService = async (user: TSAuthentication) => {
    const { email, password } = user;
    return await db.query.AuthenticationTable.findFirst({
        columns: {
            email: true,
            role: true,
            password: true
        }, where: sql` ${AuthenticationTable.email} = ${email}`,
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
    })
}


