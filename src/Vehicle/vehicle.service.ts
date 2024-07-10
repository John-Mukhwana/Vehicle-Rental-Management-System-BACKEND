
import {eq} from "drizzle-orm";
import db from "../drizzle/db";
import {TIVehicle, TSVehicle, VehiclesTable} from "../drizzle/schema";

export const vehiclesService = async (limit?: number): Promise<TSVehicle[] | null> => {
    if (limit) {
        return await db.query.VehiclesTable.findMany({
            limit: limit
        });
    }
    return await db.query.VehiclesTable.findMany();

}

export const getVehicleService = async (id: number): Promise<TSVehicle | undefined> => {
    return await db.query.VehiclesTable.findFirst({
        where: eq(VehiclesTable.vehicleId, id)
    })
}

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