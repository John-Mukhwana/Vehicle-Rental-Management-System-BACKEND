"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginService = exports.createAuthUserService = exports.deleteAuthenticationService = exports.updateAuthenticationService = exports.createAuthenticationService = exports.getAuthenticationService = exports.authenticationService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const authenticationService = async (limit) => {
    if (limit) {
        return await db_1.default.query.AuthenticationTable.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.AuthenticationTable.findMany();
};
exports.authenticationService = authenticationService;
const getAuthenticationService = async (id) => {
    return await db_1.default.query.AuthenticationTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.AuthenticationTable.authId, id)
    });
};
exports.getAuthenticationService = getAuthenticationService;
const createAuthenticationService = async (authentication) => {
    await db_1.default.insert(schema_1.AuthenticationTable).values(authentication);
    return "Authentication created successfully";
};
exports.createAuthenticationService = createAuthenticationService;
const updateAuthenticationService = async (id, authentication) => {
    await db_1.default.update(schema_1.AuthenticationTable).set(authentication).where((0, drizzle_orm_1.eq)(schema_1.AuthenticationTable.authId, id));
    return "Athentication updated successfully";
};
exports.updateAuthenticationService = updateAuthenticationService;
const deleteAuthenticationService = async (id) => {
    await db_1.default.delete(schema_1.AuthenticationTable).where((0, drizzle_orm_1.eq)(schema_1.AuthenticationTable.authId, id));
    return "Authentication deleted successfully";
};
exports.deleteAuthenticationService = deleteAuthenticationService;
//For user registration
const createAuthUserService = async (user) => {
    await db_1.default.insert(schema_1.AuthenticationTable).values(user);
    return "User Registered successfully";
};
exports.createAuthUserService = createAuthUserService;
//For user login
const userLoginService = async (user) => {
    const { email, password, role } = user;
    return await db_1.default.query.AuthenticationTable.findFirst({
        columns: {
            email: true,
            role: true,
            password: true
        }, where: (0, drizzle_orm_1.sql) ` ${schema_1.AuthenticationTable.email} = ${email}`,
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
exports.userLoginService = userLoginService;
