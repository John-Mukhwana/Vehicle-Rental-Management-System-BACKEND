
import { Context } from "hono";
import { FleetManagementService, getFleetManagementService, createFleetManagementService, updateFleetManagementService, deleteFleetManagementService } from './FleetManagement.service';

export const listFleetManagement = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await FleetManagementService(limit);
        if (data == null || data.length == 0) {
            return c.text("Fleet Management not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getFleetManagement = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const FleetManagement = await getFleetManagementService(id);
    if (FleetManagement == undefined) {
        return c.text("Fleet Management not found", 404);
    }
    return c.json(FleetManagement, 200);
}
export const createFleetManagement = async (c: Context) => {
    try {
        const FleetManagement = await c.req.json();
        // Convert date strings to Date objects
        if (FleetManagement.createdAt) {
            FleetManagement.createdAt = new Date(FleetManagement.createdAt);
                 }
               if (FleetManagement.updatedAt) {
             FleetManagement.updatedAt = new Date(FleetManagement.updatedAt);
       }
       if (FleetManagement.acquisitionDate) {
        FleetManagement.acquisitionDate = new Date(FleetManagement.acquisitionDate);
       }
       
        const createdFleetManagement = await createFleetManagementService(FleetManagement);


        if (!createdFleetManagement) return c.text("Fleet Management not created", 404);
        return c.json({ msg: createdFleetManagement }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateFleetManagement = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const FleetManagement = await c.req.json();
      // Convert date strings to Date objects
      if (FleetManagement.createdAt) {
        FleetManagement.createdAt = new Date(FleetManagement.createdAt);
             }
           if (FleetManagement.updatedAt) {
         FleetManagement.updatedAt = new Date(FleetManagement.updatedAt);
   }
   if (FleetManagement.acquisitionDate) {
    FleetManagement.acquisitionDate = new Date(FleetManagement.acquisitionDate);
   }
    
    try {
        // search for the user
        const searchedFleetManagement = await getFleetManagementService(id);
        if (searchedFleetManagement == undefined) return c.text("Fleet Management not found", 404);
        // get the data and update it
        const res = await updateFleetManagementService(id, FleetManagement);
        // return a success message
        if (!res) return c.text("Fleet Management not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteFleetManagement = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const FleetManagement = await getFleetManagementService(id);
        if (FleetManagement == undefined) return c.text("Fleet Management not found", 404);
        //deleting the user
        const res = await deleteFleetManagementService(id);
        if (!res) return c.text("FleetManagement not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}