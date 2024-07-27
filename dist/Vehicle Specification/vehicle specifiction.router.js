"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleSpecificationRouter = void 0;
const hono_1 = require("hono");
const vehicle_specification_controller_1 = require("./vehicle specification.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const bearAuth_1 = require("../middleware/bearAuth");
exports.vehicleSpecificationRouter = new hono_1.Hono();
//get all users      api/users
exports.vehicleSpecificationRouter.get("/vehicleSpecifications", vehicle_specification_controller_1.listVehicleSpecification);
//get a single user    api/users/1
exports.vehicleSpecificationRouter.get("/vehicleSpecifications/:id", bearAuth_1.userOrAdminRoleAuth, vehicle_specification_controller_1.getVehicleSpecification);
// create a user 
exports.vehicleSpecificationRouter.post("/vehicleSpecifications", (0, zod_validator_1.zValidator)('json', validators_1.vehicleSpecificationSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), vehicle_specification_controller_1.createVehicleSpecification);
//update a user
exports.vehicleSpecificationRouter.put("/vehicleSpecifications/:id", vehicle_specification_controller_1.updateVehicleSpecification);
exports.vehicleSpecificationRouter.delete("/vehicleSpecifications/:id", vehicle_specification_controller_1.deleteVehicleSpecification);
//https:domai.com/api/users?limit=10
