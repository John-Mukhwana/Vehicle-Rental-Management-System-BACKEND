"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRouter = void 0;
const hono_1 = require("hono");
const vehicle_controller_1 = require("./vehicle.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
// import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth";
exports.vehicleRouter = new hono_1.Hono();
//get all users      api/users
exports.vehicleRouter.get("/vehicles", /*adminRoleAuth*/ vehicle_controller_1.listVehicle);
//get a single user    api/users/1
exports.vehicleRouter.get("/vehicles/:id", /*userRoleAuth*/ vehicle_controller_1.getVehicle);
// create a user 
exports.vehicleRouter.post("/vehicles", (0, zod_validator_1.zValidator)('json', validators_1.vehicleSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), vehicle_controller_1.createVehicle);
//update a user
// vehicleRouter.put('/api/vehicles/:id', async (c) => {
//     const vehicleId = parseInt(c.req.param('id'), 10);
//     const vehicleData = await c.req.json(); // Get the JSON payload from the request
//     if (!vehicleId || !vehicleData) {
//       return c.json({ message: 'Invalid data' }, 400); // Return a 400 Bad Request if data is invalid
//     }
//     try {
//       // Assuming `updateVehicleService` updates vehicle data in your database
//       const result = await updateVehicleService(vehicleId, vehicleData);
//       return c.json({ message: result });
//     } catch (error) {
//       console.error('Error updating vehicle:', error);
//       return c.json({ message: 'Failed to update vehicle' }, 500); // Return a 500 Internal Server Error if something goes wrong
//     }
//   });
exports.vehicleRouter.put("/vehicles/:id", vehicle_controller_1.updateVehicle);
exports.vehicleRouter.delete("/vehicles/:id", vehicle_controller_1.deleteVehicle);
//https:domai.com/api/users?limit=10
