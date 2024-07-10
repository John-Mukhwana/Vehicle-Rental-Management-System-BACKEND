
import { Context } from "hono";
import { CustomerSupportTicketService, getCustomerSupportTicketService, createCustomerSupportTicketService, updateCustmerSupportTicketService, deleteCustomerSupportTicketService } from './CustomerSupportTicket.service';


export const listCustomerSupportTicket = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await CustomerSupportTicketService(limit);
        if (data == null || data.length == 0) {
            return c.text("Customer Ticket  not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getCustomerSupportTicket = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const CustomerSupportTicket = await getCustomerSupportTicketService(id);
    if (CustomerSupportTicket == undefined) {
        return c.text("Customer Support Ticket not found", 404);
    }
    return c.json(CustomerSupportTicket, 200);
}
export const createCustomerSupportTicket = async (c: Context) => {
    try {
        const CustomerSupportTicket = await c.req.json();
              // Convert date strings to Date objects
           if (CustomerSupportTicket.createdAt) {
               CustomerSupportTicket.createdAt = new Date(CustomerSupportTicket.createdAt);
               }
            if (CustomerSupportTicket.updatedAt) {
                CustomerSupportTicket.updatedAt = new Date(CustomerSupportTicket.updatedAt);
                  }
        const createdCustomerSupportTicket = await createCustomerSupportTicketService(CustomerSupportTicket);


        if (!createdCustomerSupportTicket) return c.text("Customer Support Ticket not created", 404);
        return c.json({ msg: createCustomerSupportTicket }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateCustmerSupportTicket = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const CustomerSupportTicket = await c.req.json();
                // Convert date strings to Date objects
      if (CustomerSupportTicket.createdAt) {
          CustomerSupportTicket.createdAt = new Date(CustomerSupportTicket.createdAt);
          }
       if (CustomerSupportTicket.updatedAt) {
          CustomerSupportTicket.updatedAt = new Date(CustomerSupportTicket.updatedAt);
          }  
    try {
        // search for the user
        const searchedUser = await getCustomerSupportTicketService(id);
        if (searchedUser == undefined) return c.text("Customer Support Ticket not found", 404);
        // get the data and update it
        const res = await updateCustmerSupportTicketService(id, CustomerSupportTicket);
        // return a success message
        if (!res) return c.text("Customer Support Ticket not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteCustomerSupportTicket = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const user = await getCustomerSupportTicketService(id);
        if (user == undefined) return c.text("Customer Support Ticket found", 404);
        //deleting the user
        const res = await deleteCustomerSupportTicketService(id);
        if (!res) return c.text("Cutomer Suppor Ticket deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}