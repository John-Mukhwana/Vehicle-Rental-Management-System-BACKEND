// import "dotenv/config";
// import { verify } from "hono/jwt"
// import { Context, Next } from "hono";

// //AUTHENTICATION MIDDLEWARE
// export const verifyToken = async (token: string, secret: string) => {
//     try {
//         const decoded = await verify(token as string, secret)
//         return decoded;
//     } catch (error: any) {
//         return null
//     }
// }
// //AUTHORIZATION MIDDLEWARE
// export const authMiddleware = async (c: Context, next: Next, requiredRole: string) => {
//     const token = c.req.header("Authorization");

//     if (!token) return c.json({ error: "Token not provided" }, 401);

//     const decoded = await verifyToken(token, process.env.JWT_SECRET as string);

//     if (!decoded) return c.json({ error: "Invalid token" }, 401);

//     if (requiredRole === "both") {
//         if (decoded.role !== "admin" && decoded.role !== "user") return c.json({ error: "Unauthorized" }, 401);
//         return next();
//     }

//     if (decoded.role !== requiredRole) return c.json({ error: "Unauthorized" }, 401);

//     return next();
// }

// export const adminRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "admin")
// export const userRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "user")

// export const userOrAdminRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "both");


import "dotenv/config";
import { verify } from "hono/jwt";
import { Context, Next } from "hono";

// AUTHENTICATION MIDDLEWARE
export const verifyToken = async (token: string, secret: string) => {
    try {
        const decoded = await verify(token, secret);
        console.log("Decoded Token:", decoded); // Logging decoded token
        return decoded;
    } catch (error: any) {
        console.error("Token Verification Error:", error); // Logging error
        return null;
    }
};

// AUTHORIZATION MIDDLEWARE
export const authMiddleware = async (c: Context, next: Next, requiredRole: string) => {
    const authHeader = c.req.header("Authorization");

    if (!authHeader) {
        return c.json({ error: "Token not provided" }, 401);
    }

    // Check if the token has 'Bearer' prefix
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    console.log("Extracted Token:", token); // Logging extracted token

    const decoded = await verifyToken(token, process.env.JWT_SECRET as string);

    if (!decoded) {
        return c.json({ error: "Invalid token" }, 401);
    }

    if (requiredRole === "both") {
        if (decoded.role !== "admin" && decoded.role !== "user") {
            return c.json({ error: "Unauthorized" }, 401);
        }
        return next();
    }

    if (decoded.role !== requiredRole) {
        return c.json({ error: "Unauthorized" }, 401);
    }

    return next();
};

export const adminRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "admin");
export const userRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "user");
export const userOrAdminRoleAuth = async (c: Context, next: Next) => await authMiddleware(c, next, "both");



