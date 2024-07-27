"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicleSpecification = exports.updateVehicleSpecification = exports.createVehicleSpecification = exports.getVehicleSpecification = exports.listVehicleSpecification = void 0;
const vehicle_specification_service_1 = require("./vehicle specification.service");
const listVehicleSpecification = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, vehicle_specification_service_1.vehicleSpecificationService)(limit);
        if (data == null || data.length == 0) {
            return c.text("Vehicle Specifications not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listVehicleSpecification = listVehicleSpecification;
const getVehicleSpecification = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const vehicleSpecification = await (0, vehicle_specification_service_1.getVehicleSpecificationService)(id);
    if (vehicleSpecification == undefined) {
        return c.text("Vehicle Specification not Found", 404);
    }
    return c.json(vehicleSpecification, 200);
};
exports.getVehicleSpecification = getVehicleSpecification;
const createVehicleSpecification = async (c) => {
    try {
        const VehicleSpecification = await c.req.json();
        const createdVehicleSpecification = await (0, vehicle_specification_service_1.createVehicleSpecificationService)(VehicleSpecification);
        if (!createdVehicleSpecification)
            return c.text("Vehicle Specification not created", 404);
        return c.json({ msg: createdVehicleSpecification }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createVehicleSpecification = createVehicleSpecification;
const updateVehicleSpecification = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const vehicleSpecification = await c.req.json();
    try {
        // search for the user
        const searchedVehicleSpecification = await (0, vehicle_specification_service_1.getVehicleSpecificationService)(id);
        if (searchedVehicleSpecification == undefined)
            return c.text("Vehicle Specification not found", 404);
        // get the data and update it
        const res = await (0, vehicle_specification_service_1.updateVehicleSpecificationService)(id, vehicleSpecification);
        // return a success message
        if (!res)
            return c.text("Vehicle Specification not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateVehicleSpecification = updateVehicleSpecification;
const deleteVehicleSpecification = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const vehicleSpecification = await (0, vehicle_specification_service_1.getVehicleSpecificationService)(id);
        if (vehicleSpecification == undefined)
            return c.text("Vehicle Specification not found", 404);
        //deleting the user
        const res = await (0, vehicle_specification_service_1.deleteVehicleSpecificationService)(id);
        if (!res)
            return c.text("Vehicle Specification not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteVehicleSpecification = deleteVehicleSpecification;
