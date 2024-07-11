import { locationAndBranchesService, getLocationAndBranchesServive, createLocationAndBranchesService, updateLocationAndBranchesService, deleteLocationAndBranchesService } from './LocationAndBranches.service';
export const listLocationAndBranches = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await locationAndBranchesService(limit);
        if (data == null || data.length == 0) {
            return c.text("Location And Branches not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
export const getLocationAndBranches = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await getLocationAndBranchesServive(id);
    if (user == undefined) {
        return c.text("User not found", 404);
    }
    return c.json(user, 200);
};
export const createLocationAndBranches = async (c) => {
    try {
        const LocationAndBranches = await c.req.json(); // Convert date strings to Date objects
        if (LocationAndBranches.createdAt) {
            LocationAndBranches.createdAt = new Date(LocationAndBranches.createdAt);
        }
        if (LocationAndBranches.updatedAt) {
            LocationAndBranches.updatedAt = new Date(LocationAndBranches.updatedAt);
        }
        const createLocationAndBranches = await createLocationAndBranchesService(LocationAndBranches);
        if (!createLocationAndBranches)
            return c.text("Location and Branches not created", 404);
        return c.json({ msg: createLocationAndBranches }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
export const updateLocationAndBranches = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const LocationAndBranches = await c.req.json();
    if (LocationAndBranches.createdAt) {
        LocationAndBranches.createdAt = new Date(LocationAndBranches.createdAt);
    }
    if (LocationAndBranches.updatedAt) {
        LocationAndBranches.updatedAt = new Date(LocationAndBranches.updatedAt);
    }
    try {
        // search for the user
        const searchedLocationAndBranches = await getLocationAndBranchesServive(id);
        if (searchedLocationAndBranches == undefined)
            return c.text("Location And Branches not found", 404);
        // get the data and update it
        const res = await updateLocationAndBranchesService(id, LocationAndBranches);
        // return a success message
        if (!res)
            return c.text("Location And Branches not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
export const deleteLocationAndBranches = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const LocationAndBranches = await getLocationAndBranchesServive(id);
        if (LocationAndBranches == undefined)
            return c.text("Location And Branches not found", 404);
        //deleting the user
        const res = await deleteLocationAndBranchesService(id);
        if (!res)
            return c.text("User not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
