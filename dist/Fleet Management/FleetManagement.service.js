import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { FleetManagementTable } from '../drizzle/schema';
export const FleetManagementService = async (limit) => {
    if (limit) {
        return await db.query.FleetManagementTable.findMany({
            limit: limit
        });
    }
    return await db.query.FleetManagementTable.findMany();
};
export const getFleetManagementService = async (id) => {
    return await db.query.FleetManagementTable.findFirst({
        where: eq(FleetManagementTable.fleetId, id)
    });
};
export const createFleetManagementService = async (FleetManagement) => {
    await db.insert(FleetManagementTable).values(FleetManagement);
    return "Fleet Management created successfully";
};
export const updateFleetManagementService = async (id, FleetManagement) => {
    await db.update(FleetManagementTable).set(FleetManagement).where(eq(FleetManagementTable.fleetId, id));
    return "Fleet Management updated successfully";
};
export const deleteFleetManagementService = async (id) => {
    await db.delete(FleetManagementTable).where(eq(FleetManagementTable.fleetId, id));
    return "Fleet Management deleted successfully";
};
