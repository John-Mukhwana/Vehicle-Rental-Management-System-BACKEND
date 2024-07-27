import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { VehiclesTable, VehicleSpecificationsTable } from '../drizzle/schema';
import { FleetManagementTable } from '../drizzle/schema';
// Adjust import based on your setup
export const vehiclesService = async (limit) => {
    // Fetch vehicle data
    const vehiclesQuery = db.select()
        .from(VehiclesTable);
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
        const specifications = await db.select({
            manufacturer: VehicleSpecificationsTable.manufacturer,
            model: VehicleSpecificationsTable.model,
            year: VehicleSpecificationsTable.year,
            fuelType: VehicleSpecificationsTable.fuelType,
            transmission: VehicleSpecificationsTable.transmission,
            color: VehicleSpecificationsTable.color,
            seatingCapacity: VehicleSpecificationsTable.seatingCapacity,
            features: VehicleSpecificationsTable.features,
        })
            .from(VehicleSpecificationsTable)
            .where(eq(VehicleSpecificationsTable.vehicleId, vehicle.vehicleId))
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
        const fleetManagement = await db.select({
            status: FleetManagementTable.status,
        })
            .from(FleetManagementTable)
            .where(eq(FleetManagementTable.vehicleId, vehicle.vehicleId))
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
// export const vehiclesService = async (limit?: number): Promise<TSVehicle[] | null> => {
//     if (limit) {
//         return await db.query.VehiclesTable.findMany({
//             limit: limit
//         });
//     }
//     return await db.query.VehiclesTable.findMany();
// }
export const getVehicleService = async (id) => {
    // Fetch the vehicle data
    const vehicle = await db.select()
        .from(VehiclesTable)
        .where(eq(VehiclesTable.vehicleId, id))
        .limit(1) // Ensure only one record is returned
        .execute(); // Execute the query
    if (!vehicle.length) { // Check if the result is empty
        throw new Error(`Vehicle with ID ${id} not found.`);
    }
    const vehicleData = vehicle[0]; // Get the first item from the array
    // Fetch the related vehicle specifications
    const specifications = await db.select({
        year: VehicleSpecificationsTable.year,
        fuelType: VehicleSpecificationsTable.fuelType,
        transmission: VehicleSpecificationsTable.transmission,
        color: VehicleSpecificationsTable.color,
        seatingCapacity: VehicleSpecificationsTable.seatingCapacity,
        features: VehicleSpecificationsTable.features,
    })
        .from(VehicleSpecificationsTable)
        .where(eq(VehicleSpecificationsTable.vehicleId, vehicleData.vehicleId))
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
    const fleetManagement = await db.select({
        status: FleetManagementTable.status,
    })
        .from(FleetManagementTable)
        .where(eq(FleetManagementTable.vehicleId, vehicleData.vehicleId))
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
export const createVehicleService = async (vehicle) => {
    await db.insert(VehiclesTable).values(vehicle);
    return "Vehicle created successfully";
};
export const updateVehicleService = async (id, vehicle) => {
    await db.update(VehiclesTable).set(vehicle).where(eq(VehiclesTable.vehicleId, id));
    return "Vehicle updated successfully";
};
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
export const deleteVehicleService = async (id) => {
    await db.delete(VehiclesTable).where(eq(VehiclesTable.vehicleId, id));
    return "Vehicle deleted successfully";
};
