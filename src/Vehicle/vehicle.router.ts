

import { Hono } from "hono";
import { listVehicle, getVehicle, createVehicle, updateVehicle, deleteVehicle} from "./vehicle.controller"
import { zValidator } from "@hono/zod-validator";
import { userSchema, vehicleSchema } from "../validators";
import { updateVehicleService } from "./vehicle.service";

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
vehicleRouter.put('/api/vehicles/:id', async (c) => {
    const vehicleId = parseInt(c.req.param('id'), 10);
    const vehicleData = await c.req.json(); // Get the JSON payload from the request
  
    if (!vehicleId || !vehicleData) {
      return c.json({ message: 'Invalid data' }, 400); // Return a 400 Bad Request if data is invalid
    }
  
    try {
      // Assuming `updateVehicleService` updates vehicle data in your database
      const result = await updateVehicleService(vehicleId, vehicleData);
  
      return c.json({ message: result });
    } catch (error) {
      console.error('Error updating vehicle:', error);
      return c.json({ message: 'Failed to update vehicle' }, 500); // Return a 500 Internal Server Error if something goes wrong
    }
  });
// vehicleRouter.put("/vehicles/:id", updateVehicle)

vehicleRouter.delete("/vehicles/:id", deleteVehicle)

//https:domai.com/api/users?limit=10