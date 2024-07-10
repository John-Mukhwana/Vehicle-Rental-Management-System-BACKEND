

import { Hono } from "hono";
import { listVehicle, getVehicle, createVehicle, updateVehicle, deleteVehicle} from "./vehicle.controller"
import { zValidator } from "@hono/zod-validator";
import { userSchema, vehicleSchema } from "../validators";

// import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth";

export const vehicleRouter = new Hono();

//get all users      api/users
vehicleRouter.get("/vehicles",/*adminRoleAuth*/ listVehicle);
//get a single user    api/users/1
vehicleRouter.get("/vehicles/:id",/*userRoleAuth*/ getVehicle)
// create a user 
vehicleRouter.post("/vehicles", zValidator('json', vehicleSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createVehicle)
//update a user
vehicleRouter.put("/vehicles/:id", updateVehicle)

vehicleRouter.delete("/vehicles/:id", deleteVehicle)

//https:domai.com/api/users?limit=10