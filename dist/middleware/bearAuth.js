"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userOrAdminRoleAuth = exports.userRoleAuth = exports.adminRoleAuth = exports.authMiddleware = exports.verifyToken = void 0;
require("dotenv/config");
const jwt_1 = require("hono/jwt");
//AUTHENTICATION MIDDLEWARE
const verifyToken = async (token, secret) => {
    try {
        const decoded = await (0, jwt_1.verify)(token, secret);
        console.log("Decoded Token:", decoded); // Logging decoded token
        return decoded;
    }
    catch (error) {
        console.error("Token Verification Error:", error); // Logging error
        return null;
    }
};
exports.verifyToken = verifyToken;
// AUTHORIZATION MIDDLEWARE
const authMiddleware = async (c, next, requiredRole) => {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
        return c.json({ error: "Token not provided" }, 401);
    }
    // Check if the token has 'Bearer' prefix
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    console.log("Extracted Token:", token); // Logging extracted token
    const decoded = await (0, exports.verifyToken)(token, process.env.JWT_SECRET);
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
exports.authMiddleware = authMiddleware;
const adminRoleAuth = async (c, next) => await (0, exports.authMiddleware)(c, next, "admin");
exports.adminRoleAuth = adminRoleAuth;
const userRoleAuth = async (c, next) => await (0, exports.authMiddleware)(c, next, "user");
exports.userRoleAuth = userRoleAuth;
const userOrAdminRoleAuth = async (c, next) => await (0, exports.authMiddleware)(c, next, "both");
exports.userOrAdminRoleAuth = userOrAdminRoleAuth;
