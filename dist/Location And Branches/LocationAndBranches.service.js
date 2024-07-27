"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocationAndBranchesService = exports.updateLocationAndBranchesService = exports.createLocationAndBranchesService = exports.getLocationAndBranchesServive = exports.locationAndBranchesService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const locationAndBranchesService = async (limit) => {
    if (limit) {
        return await db_1.default.query.LocationAndBranchesTable.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.LocationAndBranchesTable.findMany();
};
exports.locationAndBranchesService = locationAndBranchesService;
const getLocationAndBranchesServive = async (id) => {
    return await db_1.default.query.LocationAndBranchesTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.LocationAndBranchesTable.locationId, id)
    });
};
exports.getLocationAndBranchesServive = getLocationAndBranchesServive;
const createLocationAndBranchesService = async (LocationAndBranches) => {
    await db_1.default.insert(schema_1.LocationAndBranchesTable).values(LocationAndBranches);
    return "Location And Branches created successfully";
};
exports.createLocationAndBranchesService = createLocationAndBranchesService;
const updateLocationAndBranchesService = async (id, LocationAndBranches) => {
    await db_1.default.update(schema_1.LocationAndBranchesTable).set(LocationAndBranches).where((0, drizzle_orm_1.eq)(schema_1.LocationAndBranchesTable.locationId, id));
    return "Location And Branches updated successfully";
};
exports.updateLocationAndBranchesService = updateLocationAndBranchesService;
const deleteLocationAndBranchesService = async (id) => {
    await db_1.default.delete(schema_1.LocationAndBranchesTable).where((0, drizzle_orm_1.eq)(schema_1.LocationAndBranchesTable.locationId, id));
    return "Location And Brnches deleted successfully";
};
exports.deleteLocationAndBranchesService = deleteLocationAndBranchesService;
