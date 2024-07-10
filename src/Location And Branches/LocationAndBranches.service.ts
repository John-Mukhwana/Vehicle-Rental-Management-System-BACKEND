import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TILocationAndBranch, TSLocationAndBranch, LocationAndBranchesTable } from '../drizzle/schema';

export const locationAndBranchesService = async (limit?: number): Promise<TSLocationAndBranch[] | null> => {
    if (limit) {
        return await db.query.LocationAndBranchesTable.findMany({
            limit: limit
        });
    }
    return await db.query.LocationAndBranchesTable.findMany();
}

export const getLocationAndBranchesServive = async (id: number): Promise<TILocationAndBranch | undefined> => {
    return await db.query.LocationAndBranchesTable.findFirst({
        where: eq(LocationAndBranchesTable.locationId, id)
    })
}

export const createLocationAndBranchesService = async (LocationAndBranches: TILocationAndBranch) => {
    await db.insert(LocationAndBranchesTable).values(LocationAndBranches)
    return "Location And Branches created successfully";
}

export const updateLocationAndBranchesService = async (id: number, LocationAndBranches: TILocationAndBranch) => {
    await db.update(LocationAndBranchesTable).set(LocationAndBranches).where(eq(LocationAndBranchesTable.locationId, id))
    return "Location And Branches updated successfully";
}

export const deleteLocationAndBranchesService = async (id: number) => {
    await db.delete(LocationAndBranchesTable).where(eq(LocationAndBranchesTable.locationId, id))
    return "Location And Brnches deleted successfully";
}
