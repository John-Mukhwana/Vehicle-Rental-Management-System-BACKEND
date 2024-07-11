import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { CustomerSupportTicketsTable } from '../drizzle/schema';
export const CustomerSupportTicketService = async (limit) => {
    if (limit) {
        return await db.query.CustomerSupportTicketsTable.findMany({
            limit: limit
        });
    }
    return await db.query.CustomerSupportTicketsTable.findMany();
};
export const getCustomerSupportTicketService = async (id) => {
    return await db.query.CustomerSupportTicketsTable.findFirst({
        where: eq(CustomerSupportTicketsTable.ticketId, id)
    });
};
export const createCustomerSupportTicketService = async (CustomerSupportTicket) => {
    await db.insert(CustomerSupportTicketsTable).values(CustomerSupportTicket);
    return "Customer Support Ticket  created successfully";
};
export const updateCustmerSupportTicketService = async (id, CustomerSupportTicket) => {
    await db.update(CustomerSupportTicketsTable).set(CustomerSupportTicket).where(eq(CustomerSupportTicketsTable.ticketId, id));
    return "Customer Support Ticket  updated successfully";
};
export const deleteCustomerSupportTicketService = async (id) => {
    await db.delete(CustomerSupportTicketsTable).where(eq(CustomerSupportTicketsTable.ticketId, id));
    return "Customer Support Ticket deleted successfully";
};
