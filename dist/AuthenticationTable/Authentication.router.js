"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = exports.authenticationRouter = void 0;
const hono_1 = require("hono");
const Authentication_controller_1 = require("./Authentication.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
exports.authenticationRouter = new hono_1.Hono();
//get all users      api/users
exports.authenticationRouter.get("/authentication", Authentication_controller_1.listAuthentication);
//get a single user    api/users/1
exports.authenticationRouter.get("/authentication/:id", Authentication_controller_1.getAuthentication);
// create a user 
exports.authenticationRouter.post("/authentication", (0, zod_validator_1.zValidator)('json', validators_1.userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), Authentication_controller_1.createAuthentication);
//update a user
exports.authenticationRouter.put("/authentication/:id", Authentication_controller_1.updateAuthentication);
exports.authenticationRouter.delete("/authentication/:id", Authentication_controller_1.deleteAuthentication);
//Register the router
exports.authRouter = new hono_1.Hono();
exports.authRouter.post('/register', (0, zod_validator_1.zValidator)('json', validators_1.registerUserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), Authentication_controller_1.registerUser);
exports.authRouter.post('/login', (0, zod_validator_1.zValidator)('json', validators_1.loginUserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), Authentication_controller_1.loginUser);
