"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicleService = exports.updateVehicleService = exports.createVehicleService = exports.getVehicleService = exports.vehiclesService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const schema_2 = require("../drizzle/schema");
// Adjust import based on your setup
const vehiclesService = async (limit) => {
    // Fetch vehicle data
    const vehiclesQuery = db_1.default.select()
        .from(schema_1.VehiclesTable);
    if (limit) {
        vehiclesQuery.limit(limit);
    }
    const vehicles = await vehiclesQuery.execute();
    if (!vehicles.length) {
        return null;
    }
    // Fetch related data for each vehicle
    const vehiclesWithRelatedData = await Promise.all(vehicles.map(async (vehicle) => {
        // Fetch vehicle specifications
        const specifications = await db_1.default.select({
            manufacturer: schema_1.VehicleSpecificationsTable.manufacturer,
            model: schema_1.VehicleSpecificationsTable.model,
            year: schema_1.VehicleSpecificationsTable.year,
            fuelType: schema_1.VehicleSpecificationsTable.fuelType,
            transmission: schema_1.VehicleSpecificationsTable.transmission,
            color: schema_1.VehicleSpecificationsTable.color,
            seatingCapacity: schema_1.VehicleSpecificationsTable.seatingCapacity,
            features: schema_1.VehicleSpecificationsTable.features,
        })
            .from(schema_1.VehicleSpecificationsTable)
            .where((0, drizzle_orm_1.eq)(schema_1.VehicleSpecificationsTable.vehicleId, vehicle.vehicleId))
            .limit(1) // Ensure only one record is returned
            .execute();
        const specificationsData = specifications.length ? specifications[0] : {
            manfacturer: '',
            model: '',
            year: 0,
            fuelType: '',
            transmission: '',
            color: '',
            seatingCapacity: 0,
            features: '',
        };
        // Fetch fleet management data
        const fleetManagement = await db_1.default.select({
            status: schema_2.FleetManagementTable.status,
        })
            .from(schema_2.FleetManagementTable)
            .where((0, drizzle_orm_1.eq)(schema_2.FleetManagementTable.vehicleId, vehicle.vehicleId))
            .limit(1) // Ensure only one record is returned
            .execute();
        const fleetManagementData = fleetManagement.length ? fleetManagement[0] : {
            status: '',
        };
        return {
            ...vehicle,
            specifications: specificationsData,
            fleetManagement: fleetManagementData,
        };
    }));
    return vehiclesWithRelatedData;
};
exports.vehiclesService = vehiclesService;
// export const vehiclesService = async (limit?: number): Promise<TSVehicle[] | null> => {
//     if (limit) {
//         return await db.query.VehiclesTable.findMany({
//             limit: limit
//         });
//     }
//     return await db.query.VehiclesTable.findMany();
// }
const getVehicleService = async (id) => {
    // Fetch the vehicle data
    const vehicle = await db_1.default.select()
        .from(schema_1.VehiclesTable)
        .where((0, drizzle_orm_1.eq)(schema_1.VehiclesTable.vehicleId, id))
        .limit(1) // Ensure only one record is returned
        .execute(); // Execute the query
    if (!vehicle.length) { // Check if the result is empty
        throw new Error(`Vehicle with ID ${id} not found.`);
    }
    const vehicleData = vehicle[0]; // Get the first item from the array
    // Fetch the related vehicle specifications
    const specifications = await db_1.default.select({
        year: schema_1.VehicleSpecificationsTable.year,
        fuelType: schema_1.VehicleSpecificationsTable.fuelType,
        transmission: schema_1.VehicleSpecificationsTable.transmission,
        color: schema_1.VehicleSpecificationsTable.color,
        seatingCapacity: schema_1.VehicleSpecificationsTable.seatingCapacity,
        features: schema_1.VehicleSpecificationsTable.features,
    })
        .from(schema_1.VehicleSpecificationsTable)
        .where((0, drizzle_orm_1.eq)(schema_1.VehicleSpecificationsTable.vehicleId, vehicleData.vehicleId))
        .limit(1) // Ensure only one record is returned
        .execute(); // Execute the query
    const specificationsData = specifications.length ? specifications[0] : {
        fuelType: '',
        transmission: '',
        color: '',
        seatingCapacity: 0,
        features: '',
    };
    // Fetch the related fleet management status
    const fleetManagement = await db_1.default.select({
        status: schema_2.FleetManagementTable.status,
    })
        .from(schema_2.FleetManagementTable)
        .where((0, drizzle_orm_1.eq)(schema_2.FleetManagementTable.vehicleId, vehicleData.vehicleId))
        .limit(1) // Ensure only one record is returned
        .execute(); // Execute the query
    const fleetManagementData = fleetManagement.length ? fleetManagement[0] : {
        status: '',
    };
    return {
        ...vehicleData,
        specifications: specificationsData,
        fleetManagement: fleetManagementData,
    };
};
exports.getVehicleService = getVehicleService;
const createVehicleService = async (vehicle) => {
    await db_1.default.insert(schema_1.VehiclesTable).values(vehicle);
    return "Vehicle created successfully";
};
exports.createVehicleService = createVehicleService;
const updateVehicleService = async (id, vehicle) => {
    await db_1.default.update(schema_1.VehiclesTable).set(vehicle).where((0, drizzle_orm_1.eq)(schema_1.VehiclesTable.vehicleId, id));
    return "Vehicle updated successfully";
};
exports.updateVehicleService = updateVehicleService;
// export const updateVehicleService = async (id: number, vehicle: TIVehicle & { specifications: any, fleetManagement: any }) => {
//   try {
//     // Start a transaction to ensure atomic updates
//     await db.transaction(async (trx) => {
//       // Update the main vehicle record
//       await trx.update(VehiclesTable)
//         .set({
//             vehicleId: vehicle.vehicleId,
//             vehicleImage: vehicle.vehicleImage
//           // Assuming the table only needs to store the vehicle ID and maybe other fields
//           // If the VehiclesTable has other fields to update, include them here
//         })
//         .where(eq(VehiclesTable.vehicleId, id));
//       // Update related vehicle specifications
//       await trx.update(VehicleSpecificationsTable)
//         .set({
//           manufacturer: vehicle.specifications.manufacturer,
//           model: vehicle.specifications.model,
//           year: vehicle.specifications.year,
//           fuelType: vehicle.specifications.fuelType,
//           transmission: vehicle.specifications.transmission,
//           color: vehicle.specifications.color,
//           seatingCapacity: vehicle.specifications.seatingCapacity,
//           features: vehicle.specifications.features
//         })
//         .where(eq(VehicleSpecificationsTable.vehicleId, id)); // Ensure this is the correct key
//       // Update fleet management status
//       await trx.update(FleetManagementTable)
//         .set({
//           status: vehicle.fleetManagement.status
//         })
//         .where(eq(FleetManagementTable.vehicleId, id)); // Ensure this is the correct key
//     });
//     return "Vehicle updated successfully";
//   } catch (error) {
//     console.error('Error updating vehicle:', error);
//     throw new Error('Failed to update vehicle');
//   }
// };
const deleteVehicleService = async (id) => {
    await db_1.default.delete(schema_1.VehiclesTable).where((0, drizzle_orm_1.eq)(schema_1.VehiclesTable.vehicleId, id));
    return "Vehicle deleted successfully";
};
exports.deleteVehicleService = deleteVehicleService;
