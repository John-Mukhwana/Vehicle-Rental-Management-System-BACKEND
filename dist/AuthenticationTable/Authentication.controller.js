"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = exports.deleteAuthentication = exports.updateAuthentication = exports.createAuthentication = exports.getAuthentication = exports.listAuthentication = void 0;
const Authentication_service_1 = require("./Authentication.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("hono/jwt");
const listAuthentication = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, Authentication_service_1.authenticationService)(limit);
        if (data == null || data.length == 0) {
            return c.text("Authentication not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listAuthentication = listAuthentication;
const getAuthentication = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const Authentication = await (0, Authentication_service_1.getAuthenticationService)(id);
    if (Authentication == undefined) {
        return c.text("Authentication not found", 404);
    }
    return c.json(Authentication, 200);
};
exports.getAuthentication = getAuthentication;
const createAuthentication = async (c) => {
    try {
        const Authentication = await c.req.json();
        const createdAuthentication = await (0, Authentication_service_1.createAuthenticationService)(Authentication);
        if (!createdAuthentication)
            return c.text("Authentication not created", 404);
        return c.json({ msg: createdAuthentication }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createAuthentication = createAuthentication;
const updateAuthentication = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const Authentication = await c.req.json();
    try {
        // search for the user
        const searchedAuthentication = await (0, Authentication_service_1.getAuthenticationService)(id);
        if (searchedAuthentication == undefined)
            return c.text("Authentication not found", 404);
        // get the data and update it
        const res = await (0, Authentication_service_1.updateAuthenticationService)(id, Authentication);
        // return a success message
        if (!res)
            return c.text("Authentication not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateAuthentication = updateAuthentication;
const deleteAuthentication = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const Authentication = await (0, Authentication_service_1.getAuthenticationService)(id);
        if (Authentication == undefined)
            return c.text("Authentication not found", 404);
        //deleting the user
        const res = await (0, Authentication_service_1.deleteAuthenticationService)(id);
        if (!res)
            return c.text("Authentication not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteAuthentication = deleteAuthentication;
//Register Aunthentication
const registerUser = async (c) => {
    try {
        const user = await c.req.json();
        const pass = user.password;
        const hashedPassword = await bcrypt_1.default.hash(pass, 10);
        user.password = hashedPassword;
        const createdUser = await (0, Authentication_service_1.createAuthUserService)(user);
        if (!createdUser)
            return c.text("User not created", 404);
        return c.json({ msg: createdUser }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.registerUser = registerUser;
const loginUser = async (c) => {
    try {
        const user = await c.req.json();
        //check user exist
        const userExist = await (0, Authentication_service_1.userLoginService)(user);
        if (userExist === null)
            return c.json({ error: "User not found" }, 404); // not found         
        const userMatch = await bcrypt_1.default.compare(user.password, userExist?.password);
        if (!userMatch) {
            return c.json({ error: "Invalid credentials" }, 401); // unauthorized
        }
        else {
            // create a payload
            const payload = {
                sub: userExist?.email,
                role: userExist?.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 180) // 3 hour  => SESSION EXPIRATION
            };
            let secret = process.env.JWT_SECRET; // secret key
            const token = await (0, jwt_1.sign)(payload, secret); // create a JWT token
            let user = userExist?.users;
            let role = userExist?.role;
            return c.json({ token, user: { role, ...user } }, 200); // return token and user details
        }
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.loginUser = loginUser;
