"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicleSpecificationService = exports.updateVehicleSpecificationService = exports.createVehicleSpecificationService = exports.getVehicleSpecificationService = exports.vehicleSpecificationService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const vehicleSpecificationService = async (limit) => {
    if (limit) {
        return await db_1.default.query.VehicleSpecificationsTable.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.VehicleSpecificationsTable.findMany();
};
exports.vehicleSpecificationService = vehicleSpecificationService;
const getVehicleSpecificationService = async (id) => {
    return await db_1.default.query.VehicleSpecificationsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.VehicleSpecificationsTable.vehicleId, id)
    });
};
exports.getVehicleSpecificationService = getVehicleSpecificationService;
const createVehicleSpecificationService = async (vehicleSpecification) => {
    await db_1.default.insert(schema_1.VehicleSpecificationsTable).values(vehicleSpecification);
    return "Vehicle created successfully";
};
exports.createVehicleSpecificationService = createVehicleSpecificationService;
const updateVehicleSpecificationService = async (id, vehicleSpecification) => {
    await db_1.default.update(schema_1.VehicleSpecificationsTable).set(vehicleSpecification).where((0, drizzle_orm_1.eq)(schema_1.VehicleSpecificationsTable.vehicleId, id));
    return "Vehicle updated successfully";
};
exports.updateVehicleSpecificationService = updateVehicleSpecificationService;
const deleteVehicleSpecificationService = async (id) => {
    await db_1.default.delete(schema_1.VehicleSpecificationsTable).where((0, drizzle_orm_1.eq)(schema_1.VehicleSpecificationsTable.vehicleId, id));
    return "Vehicle deleted successfully";
};
exports.deleteVehicleSpecificationService = deleteVehicleSpecificationService;
