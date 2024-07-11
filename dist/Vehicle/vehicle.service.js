import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { VehiclesTable } from "../drizzle/schema";
export const vehiclesService = async (limit) => {
    if (limit) {
        return await db.query.VehiclesTable.findMany({
            limit: limit
        });
    }
    return await db.query.VehiclesTable.findMany();
};
export const getVehicleService = async (id) => {
    return await db.query.VehiclesTable.findFirst({
        where: eq(VehiclesTable.vehicleId, id)
    });
};
export const createVehicleService = async (vehicle) => {
    await db.insert(VehiclesTable).values(vehicle);
    return "Vehicle created successfully";
};
export const updateVehicleService = async (id, vehicle) => {
    await db.update(VehiclesTable).set(vehicle).where(eq(VehiclesTable.vehicleId, id));
    return "Vehicle updated successfully";
};
export const deleteVehicleService = async (id) => {
    await db.delete(VehiclesTable).where(eq(VehiclesTable.vehicleId, id));
    return "Vehicle deleted successfully";
};
