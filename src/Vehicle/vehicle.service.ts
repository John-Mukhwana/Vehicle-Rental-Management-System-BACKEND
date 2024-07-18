
import {eq} from "drizzle-orm";
import db from "../drizzle/db";
import { TIVehicle, TSVehicle, VehiclesTable, VehicleSpecificationsTable } from '../drizzle/schema';
import { VehicleSpecifications, FleetManagement, ExtendedTSVehicle } from '../types/types'; // Adjust type import based on your setup
import { FleetManagementTable } from '../drizzle/schema';
// Adjust import based on your setup
export const vehiclesService = async (limit?: number): Promise<ExtendedTSVehicle[] | any> => {
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
export const getVehicleService = async (id: number): Promise<TSVehicle & { specifications: any, fleetManagement: any }> => {
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

export const createVehicleService = async (vehicle: TIVehicle) => {
    await db.insert(VehiclesTable).values(vehicle)
    return "Vehicle created successfully";
}

export const updateVehicleService = async (id: number, vehicle: TIVehicle) => {
    await db.update(VehiclesTable).set(vehicle).where(eq(VehiclesTable.vehicleId, id))
    return "Vehicle updated successfully";
}

export const deleteVehicleService = async (id: number) => {
    await db.delete(VehiclesTable).where(eq(VehiclesTable.vehicleId, id))
    return "Vehicle deleted successfully";
}