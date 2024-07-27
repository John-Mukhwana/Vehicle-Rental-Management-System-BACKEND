"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicle = exports.updateVehicle = exports.createVehicle = exports.getVehicle = exports.listVehicle = void 0;
const vehicle_service_1 = require("./vehicle.service");
const listVehicle = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, vehicle_service_1.vehiclesService)(limit);
        if (data == null || data.length == 0) {
            return c.text("Vehicle not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listVehicle = listVehicle;
const getVehicle = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const vehicle = await (0, vehicle_service_1.getVehicleService)(id);
    if (vehicle == undefined) {
        return c.text("Vehicle not Found", 404);
    }
    return c.json(vehicle, 200);
};
exports.getVehicle = getVehicle;
const createVehicle = async (c) => {
    try {
        const vehicle = await c.req.json();
        // Convert date strings to Date objects
        if (vehicle.createdAt) {
            vehicle.createdAt = new Date(vehicle.createdAt);
        }
        if (vehicle.updatedAt) {
            vehicle.updatedAt = new Date(vehicle.updatedAt);
        }
        const createdUser = await (0, vehicle_service_1.createVehicleService)(vehicle);
        if (!createdUser)
            return c.text("Vehicle not created", 404);
        return c.json({ msg: createdUser }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createVehicle = createVehicle;
const updateVehicle = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const vehicle = await c.req.json();
    // Convert date strings to Date objects
    if (vehicle.createdAt) {
        vehicle.createdAt = new Date(vehicle.createdAt);
    }
    if (vehicle.updatedAt) {
        vehicle.updatedAt = new Date(vehicle.updatedAt);
    }
    try {
        // search for the user
        const searchedUser = await (0, vehicle_service_1.getVehicleService)(id);
        if (searchedUser == undefined)
            return c.text("Vehicle not found", 404);
        // get the data and update it
        const res = await (0, vehicle_service_1.updateVehicleService)(id, vehicle);
        // return a success message
        if (!res)
            return c.text("Vehicle not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateVehicle = updateVehicle;
const deleteVehicle = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const user = await (0, vehicle_service_1.getVehicleService)(id);
        if (user == undefined)
            return c.text("Vehicle not found", 404);
        //deleting the user
        const res = await (0, vehicle_service_1.deleteVehicleService)(id);
        if (!res)
            return c.text("Vehicle not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteVehicle = deleteVehicle;
