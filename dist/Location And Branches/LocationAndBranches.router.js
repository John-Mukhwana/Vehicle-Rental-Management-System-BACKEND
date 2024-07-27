"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationAndBranchesRouter = void 0;
const hono_1 = require("hono");
const LocationAndBranches_controller_1 = require("./LocationAndBranches.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const bearAuth_1 = require("../middleware/bearAuth");
exports.locationAndBranchesRouter = new hono_1.Hono();
//get all users      api/users
exports.locationAndBranchesRouter.get("/locationAndBranches", bearAuth_1.adminRoleAuth, LocationAndBranches_controller_1.listLocationAndBranches);
//get a single user    api/users/1
exports.locationAndBranchesRouter.get("/locationAndBranches/:id", bearAuth_1.userOrAdminRoleAuth, LocationAndBranches_controller_1.getLocationAndBranches);
// create a user 
exports.locationAndBranchesRouter.post("/locationAndBranches", (0, zod_validator_1.zValidator)('json', validators_1.locationAndBranchesSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), LocationAndBranches_controller_1.createLocationAndBranches);
//update a user
exports.locationAndBranchesRouter.put("/locationAndBranches/:id", LocationAndBranches_controller_1.updateLocationAndBranches);
exports.locationAndBranchesRouter.delete("/users/:id", LocationAndBranches_controller_1.deleteLocationAndBranches);
