import { Hono } from "hono";
import { listFleetManagement, getFleetManagement, createFleetManagement, updateFleetManagement, deleteFleetManagement } from "./FleetManagement.controller";
import { zValidator } from "@hono/zod-validator";
import { FleetManagementSchema } from "../validators";
export const fleetManagementRouter = new Hono();
//get all users      api/users
fleetManagementRouter.get("/fleets", listFleetManagement);
//get a single user    api/users/1
fleetManagementRouter.get("/fleets/:id", getFleetManagement);
// create a user 
fleetManagementRouter.post("/fleets", zValidator('json', FleetManagementSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createFleetManagement);
//update a user
fleetManagementRouter.put("/fleets/:id", updateFleetManagement);
fleetManagementRouter.delete("/fleets/:id", deleteFleetManagement);
