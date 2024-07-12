import { Hono } from "hono";
import { listCustomerSupportTicket,createCustomerSupportTicket,getCustomerSupportTicket,updateCustmerSupportTicket,deleteCustomerSupportTicket } from "./CustomerSupportTicket.controller";
import { zValidator } from "@hono/zod-validator";
import { ticketSchema } from "../validators";
import { adminRoleAuth, userOrAdminRoleAuth } from "../middleware/bearAuth";


export const customerSupportTicketRouter = new Hono();

//get all users      api/users
customerSupportTicketRouter.get("/tickets",adminRoleAuth, listCustomerSupportTicket);
//get a single user    api/users/1
customerSupportTicketRouter.get("/tickets/:id",userOrAdminRoleAuth, getCustomerSupportTicket)
// create a user 
customerSupportTicketRouter.post("/tickets", zValidator('json', ticketSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createCustomerSupportTicket)
//update a user
customerSupportTicketRouter.put("/tickets/:id", updateCustmerSupportTicket)

customerSupportTicketRouter.delete("/tickets/:id", deleteCustomerSupportTicket)

