

import { Context } from "hono";
import { vehicleSpecificationService, getVehicleSpecificationService,createVehicleSpecificationService,updateVehicleSpecificationService, deleteVehicleSpecificationService } from "./vehicle specification.service";
import bycript from 'bcrypt';

export const listVehicleSpecification = async  (c: Context) => {

    try {
        //limit the number of users to be returned

        const limit  = Number(c.req.query('limit'))

        const data = await vehicleSpecificationService(limit);
        if (data == null || data.length == 0) {
            return c.text("Vehicle Specifications not found", 404)
        }
        return c.json(data, 200);
    }catch (error: any) {
        return c.json({ error:error?.message},400)
    }

}

export const getVehicleSpecification = async (c:Context) =>{

    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID",400);

    const vehicleSpecification = await getVehicleSpecificationService(id);
    if(vehicleSpecification == undefined){
        return c.text("Vehicle Specification not Found",404)
    }
    return c.json(vehicleSpecification,200)
}

export const createVehicleSpecification = async (c: Context) => {
    try {
        const VehicleSpecification = await c.req.json();
        
        const createdVehicleSpecification = await createVehicleSpecificationService(VehicleSpecification);

        if (!createdVehicleSpecification) return c.text("Vehicle Specification not created", 404);
        return c.json({ msg: createdVehicleSpecification }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateVehicleSpecification = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const vehicleSpecification = await c.req.json();
    try {
        // search for the user
        const searchedVehicleSpecification = await getVehicleSpecificationService(id);
        if (searchedVehicleSpecification == undefined) return c.text("Vehicle Specification not found", 404);
        // get the data and update it
        const res = await updateVehicleSpecificationService(id, vehicleSpecification);
        // return a success message
        if (!res) return c.text("Vehicle Specification not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteVehicleSpecification = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const vehicleSpecification = await getVehicleSpecificationService(id);
        if (vehicleSpecification == undefined) return c.text("Vehicle Specification not found", 404);
        //deleting the user
        const res = await deleteVehicleSpecificationService(id);
        if (!res) return c.text("Vehicle Specification not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}