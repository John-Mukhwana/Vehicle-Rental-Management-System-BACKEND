import { Hono } from "hono";
import { listAuthentication, getAuthentication, createAuthentication, updateAuthentication, deleteAuthentication, loginUser, registerUser } from "./Authentication.controller";
import { zValidator } from "@hono/zod-validator";
import { userSchema, registerUserSchema, loginUserSchema } from "../validators";
export const authenticationRouter = new Hono();
//get all users      api/users
authenticationRouter.get("/authentication", listAuthentication);
//get a single user    api/users/1
authenticationRouter.get("/authentication/:id", getAuthentication);
// create a user 
authenticationRouter.post("/authentication", zValidator('json', userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createAuthentication);
//update a user
authenticationRouter.put("/authentication/:id", updateAuthentication);
authenticationRouter.delete("/authentication/:id", deleteAuthentication);
//Register the router
export const authRouter = new Hono();
authRouter.post('/register', zValidator('json', registerUserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), registerUser);
authRouter.post('/login', zValidator('json', loginUserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), loginUser);
