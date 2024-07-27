"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFleetManagementService = exports.updateFleetManagementService = exports.createFleetManagementService = exports.getFleetManagementService = exports.FleetManagementService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const FleetManagementService = async (limit) => {
    if (limit) {
        return await db_1.default.query.FleetManagementTable.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.FleetManagementTable.findMany();
};
exports.FleetManagementService = FleetManagementService;
const getFleetManagementService = async (id) => {
    return await db_1.default.query.FleetManagementTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.FleetManagementTable.fleetId, id)
    });
};
exports.getFleetManagementService = getFleetManagementService;
const createFleetManagementService = async (FleetManagement) => {
    await db_1.default.insert(schema_1.FleetManagementTable).values(FleetManagement);
    return "Fleet Management created successfully";
};
exports.createFleetManagementService = createFleetManagementService;
const updateFleetManagementService = async (id, FleetManagement) => {
    await db_1.default.update(schema_1.FleetManagementTable).set(FleetManagement).where((0, drizzle_orm_1.eq)(schema_1.FleetManagementTable.fleetId, id));
    return "Fleet Management updated successfully";
};
exports.updateFleetManagementService = updateFleetManagementService;
const deleteFleetManagementService = async (id) => {
    await db_1.default.delete(schema_1.FleetManagementTable).where((0, drizzle_orm_1.eq)(schema_1.FleetManagementTable.fleetId, id));
    return "Fleet Management deleted successfully";
};
exports.deleteFleetManagementService = deleteFleetManagementService;
