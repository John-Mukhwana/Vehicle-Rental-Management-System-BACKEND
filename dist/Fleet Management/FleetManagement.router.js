"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fleetManagementRouter = void 0;
const hono_1 = require("hono");
const FleetManagement_controller_1 = require("./FleetManagement.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const bearAuth_1 = require("../middleware/bearAuth");
exports.fleetManagementRouter = new hono_1.Hono();
//get all users      api/users
exports.fleetManagementRouter.get("/fleets", bearAuth_1.adminRoleAuth, FleetManagement_controller_1.listFleetManagement);
//get a single user    api/users/1
exports.fleetManagementRouter.get("/fleets/:id", bearAuth_1.userOrAdminRoleAuth, FleetManagement_controller_1.getFleetManagement);
// create a user 
exports.fleetManagementRouter.post("/fleets", (0, zod_validator_1.zValidator)('json', validators_1.FleetManagementSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), FleetManagement_controller_1.createFleetManagement);
//update a user
exports.fleetManagementRouter.put("/fleets/:id", FleetManagement_controller_1.updateFleetManagement);
exports.fleetManagementRouter.delete("/fleets/:id", FleetManagement_controller_1.deleteFleetManagement);
