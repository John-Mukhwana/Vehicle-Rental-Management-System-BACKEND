"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocationAndBranches = exports.updateLocationAndBranches = exports.createLocationAndBranches = exports.getLocationAndBranches = exports.listLocationAndBranches = void 0;
const LocationAndBranches_service_1 = require("./LocationAndBranches.service");
const listLocationAndBranches = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, LocationAndBranches_service_1.locationAndBranchesService)(limit);
        if (data == null || data.length == 0) {
            return c.text("Location And Branches not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listLocationAndBranches = listLocationAndBranches;
const getLocationAndBranches = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await (0, LocationAndBranches_service_1.getLocationAndBranchesServive)(id);
    if (user == undefined) {
        return c.text("User not found", 404);
    }
    return c.json(user, 200);
};
exports.getLocationAndBranches = getLocationAndBranches;
const createLocationAndBranches = async (c) => {
    try {
        const LocationAndBranches = await c.req.json(); // Convert date strings to Date objects
        if (LocationAndBranches.createdAt) {
            LocationAndBranches.createdAt = new Date(LocationAndBranches.createdAt);
        }
        if (LocationAndBranches.updatedAt) {
            LocationAndBranches.updatedAt = new Date(LocationAndBranches.updatedAt);
        }
        const createLocationAndBranches = await (0, LocationAndBranches_service_1.createLocationAndBranchesService)(LocationAndBranches);
        if (!createLocationAndBranches)
            return c.text("Location and Branches not created", 404);
        return c.json({ msg: createLocationAndBranches }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createLocationAndBranches = createLocationAndBranches;
const updateLocationAndBranches = async (c) => {
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
        const searchedLocationAndBranches = await (0, LocationAndBranches_service_1.getLocationAndBranchesServive)(id);
        if (searchedLocationAndBranches == undefined)
            return c.text("Location And Branches not found", 404);
        // get the data and update it
        const res = await (0, LocationAndBranches_service_1.updateLocationAndBranchesService)(id, LocationAndBranches);
        // return a success message
        if (!res)
            return c.text("Location And Branches not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateLocationAndBranches = updateLocationAndBranches;
const deleteLocationAndBranches = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const LocationAndBranches = await (0, LocationAndBranches_service_1.getLocationAndBranchesServive)(id);
        if (LocationAndBranches == undefined)
            return c.text("Location And Branches not found", 404);
        //deleting the user
        const res = await (0, LocationAndBranches_service_1.deleteLocationAndBranchesService)(id);
        if (!res)
            return c.text("User not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteLocationAndBranches = deleteLocationAndBranches;
