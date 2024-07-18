import { Hono } from "hono";
import { listUsers, getUser, createUser, updateUser, deleteUser } from "./user.controller"
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validators";
import { adminRoleAuth, userOrAdminRoleAuth, userRoleAuth } from "../middleware/bearAuth";

// import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth";

export const userRouter = new Hono();

//get all users      api/users
userRouter.get("/users", listUsers);
userRouter.get("/users/:id",userOrAdminRoleAuth, getUser)
//get a single user    api/users/1s
userRouter.get("/users/:id",userRoleAuth, getUser)
// create a user 
userRouter.post("/users", zValidator('json', userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createUser)
//update a user
userRouter.put("/users/:id", updateUser)

userRouter.delete("/users/:id", deleteUser)

//https:domai.com/api/users?limit=10