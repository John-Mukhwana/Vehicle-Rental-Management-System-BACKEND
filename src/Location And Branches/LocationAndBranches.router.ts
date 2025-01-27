import { Hono } from "hono";
import { listLocationAndBranches, getLocationAndBranches, createLocationAndBranches, updateLocationAndBranches, deleteLocationAndBranches } from "./LocationAndBranches.controller"
import { zValidator } from "@hono/zod-validator";
import { locationAndBranchesSchema } from "../validators";
import { adminRoleAuth, userOrAdminRoleAuth } from "../middleware/bearAuth";
export const locationAndBranchesRouter = new Hono();

//get all users      api/users
locationAndBranchesRouter.get("/locationAndBranches",adminRoleAuth, listLocationAndBranches);
//get a single user    api/users/1
locationAndBranchesRouter.get("/locationAndBranches/:id",userOrAdminRoleAuth, getLocationAndBranches)
// create a user 
locationAndBranchesRouter.post("/locationAndBranches", zValidator('json', locationAndBranchesSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createLocationAndBranches)
//update a user
locationAndBranchesRouter.put("/locationAndBranches/:id", updateLocationAndBranches)

locationAndBranchesRouter.delete("/users/:id", deleteLocationAndBranches)

