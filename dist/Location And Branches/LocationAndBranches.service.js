import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { LocationAndBranchesTable } from '../drizzle/schema';
export const locationAndBranchesService = async (limit) => {
    if (limit) {
        return await db.query.LocationAndBranchesTable.findMany({
            limit: limit
        });
    }
    return await db.query.LocationAndBranchesTable.findMany();
};
export const getLocationAndBranchesServive = async (id) => {
    return await db.query.LocationAndBranchesTable.findFirst({
        where: eq(LocationAndBranchesTable.locationId, id)
    });
};
export const createLocationAndBranchesService = async (LocationAndBranches) => {
    await db.insert(LocationAndBranchesTable).values(LocationAndBranches);
    return "Location And Branches created successfully";
};
export const updateLocationAndBranchesService = async (id, LocationAndBranches) => {
    await db.update(LocationAndBranchesTable).set(LocationAndBranches).where(eq(LocationAndBranchesTable.locationId, id));
    return "Location And Branches updated successfully";
};
export const deleteLocationAndBranchesService = async (id) => {
    await db.delete(LocationAndBranchesTable).where(eq(LocationAndBranchesTable.locationId, id));
    return "Location And Brnches deleted successfully";
};
