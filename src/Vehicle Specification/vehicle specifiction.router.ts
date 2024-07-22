

import { Hono } from "hono";
import { listVehicleSpecification, getVehicleSpecification, createVehicleSpecification, updateVehicleSpecification, deleteVehicleSpecification} from "./vehicle specification.controller"
import { zValidator } from "@hono/zod-validator";
import { vehicleSpecificationSchema } from "../validators";

import { adminRoleAuth, userRoleAuth, userOrAdminRoleAuth} from "../middleware/bearAuth";

export const vehicleSpecificationRouter = new Hono();

//get all users      api/users
vehicleSpecificationRouter.get("/vehicleSpecifications", listVehicleSpecification);

//get a single user    api/users/1
vehicleSpecificationRouter.get("/vehicleSpecifications/:id",userOrAdminRoleAuth, getVehicleSpecification);
// create a user 
vehicleSpecificationRouter.post("/vehicleSpecifications", zValidator('json', vehicleSpecificationSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createVehicleSpecification)
//update a user
vehicleSpecificationRouter.put("/vehicleSpecifications/:id", updateVehicleSpecification)

vehicleSpecificationRouter.delete("/vehicleSpecifications/:id", deleteVehicleSpecification)

//https:domai.com/api/users?limit=10