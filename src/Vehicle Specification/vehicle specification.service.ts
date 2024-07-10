
import {eq} from "drizzle-orm";
import db from "../drizzle/db";
import {TIVehicleSpecification, TSVehicleSpecification, VehicleSpecificationsTable} from "../drizzle/schema";

export const vehicleSpecificationService = async (limit?: number): Promise<TSVehicleSpecification[] | null> => {
    if (limit) {
        return await db.query.VehicleSpecificationsTable.findMany({
            limit: limit
        });
    }
    return await db.query.VehicleSpecificationsTable.findMany();

}

export const getVehicleSpecificationService = async (id: number): Promise<TSVehicleSpecification | undefined> => {
    return await db.query.VehicleSpecificationsTable.findFirst({
        where: eq(VehicleSpecificationsTable.vehicleId, id)
    })
}

export const createVehicleSpecificationService = async (vehicleSpecification: TIVehicleSpecification) => {
    await db.insert(VehicleSpecificationsTable).values(vehicleSpecification)
    return "Vehicle created successfully";
}

export const updateVehicleSpecificationService = async (id: number, vehicleSpecification: TIVehicleSpecification) => {
    await db.update(VehicleSpecificationsTable).set(vehicleSpecification).where(eq(VehicleSpecificationsTable.vehicleId, id))
    return "Vehicle updated successfully";
}

export const deleteVehicleSpecificationService = async (id: number) => {
    await db.delete(VehicleSpecificationsTable).where(eq(VehicleSpecificationsTable.vehicleId, id))
    return "Vehicle deleted successfully";
}