import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { VehicleSpecificationsTable } from "../drizzle/schema";
export const vehicleSpecificationService = async (limit) => {
    if (limit) {
        return await db.query.VehicleSpecificationsTable.findMany({
            limit: limit
        });
    }
    return await db.query.VehicleSpecificationsTable.findMany();
};
export const getVehicleSpecificationService = async (id) => {
    return await db.query.VehicleSpecificationsTable.findFirst({
        where: eq(VehicleSpecificationsTable.vehicleId, id)
    });
};
export const createVehicleSpecificationService = async (vehicleSpecification) => {
    await db.insert(VehicleSpecificationsTable).values(vehicleSpecification);
    return "Vehicle created successfully";
};
export const updateVehicleSpecificationService = async (id, vehicleSpecification) => {
    await db.update(VehicleSpecificationsTable).set(vehicleSpecification).where(eq(VehicleSpecificationsTable.vehicleId, id));
    return "Vehicle updated successfully";
};
export const deleteVehicleSpecificationService = async (id) => {
    await db.delete(VehicleSpecificationsTable).where(eq(VehicleSpecificationsTable.vehicleId, id));
    return "Vehicle deleted successfully";
};
