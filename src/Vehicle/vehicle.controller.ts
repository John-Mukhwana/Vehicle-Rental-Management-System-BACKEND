

import { Context } from "hono";
import { vehiclesService, getVehicleService,createVehicleService,updateVehicleService, deleteVehicleService } from "./vehicle.service";
import bycript from 'bcrypt';
export const listVehicle = async  (c: Context) => {

    try {
        //limit the number of users to be returned

        const limit  = Number(c.req.query('limit'))

        const data = await vehiclesService(limit);
        if (data == null || data.length == 0) {
            return c.text("Vehicle not found", 404)
        }
        return c.json(data, 200);
    }catch (error: any) {
        return c.json({ error:error?.message},400)
    }

}

export const getVehicle = async (c:Context) =>{

    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID",400);

    const vehicle = await getVehicleService(id);
    if(vehicle == undefined){
        return c.text("Vehicle not Found",404)
    }
    return c.json(vehicle,200)
}

export const createVehicle = async (c: Context) => {
    try {
        const vehicle = await c.req.json();
        // Convert date strings to Date objects
        if (vehicle.createdAt) {
            vehicle.createdAt = new Date(vehicle.createdAt);
          }
       if (vehicle.updatedAt) {
           vehicle.updatedAt = new Date(vehicle.updatedAt);
            }
     
        const createdUser = await createVehicleService(vehicle);

        if (!createdUser) return c.text("Vehicle not created", 404);
        return c.json({ msg: createdUser }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateVehicle = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

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
        const searchedUser = await getVehicleService(id);
        if (searchedUser == undefined) return c.text("Vehicle not found", 404);
        // get the data and update it
        const res = await updateVehicleService(id, vehicle);
        // return a success message
        if (!res) return c.text("Vehicle not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteVehicle = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const user = await getVehicleService(id);
        if (user == undefined) return c.text("Vehicle not found", 404);
        //deleting the user
        const res = await deleteVehicleService(id);
        if (!res) return c.text("Vehicle not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}