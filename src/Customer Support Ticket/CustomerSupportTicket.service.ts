import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TICustomerSupportTicket, TSCustomerSupportTicket, CustomerSupportTicketsTable } from '../drizzle/schema';

export const CustomerSupportTicketService = async (limit?: number): Promise<TSCustomerSupportTicket[] | null> => {
    if (limit) {
        return await db.query.CustomerSupportTicketsTable.findMany({
            limit: limit
        });
    }
    return await db.query.CustomerSupportTicketsTable.findMany();
}

export const getCustomerSupportTicketService = async (id: number): Promise<TICustomerSupportTicket | undefined> => {
    return await db.query.CustomerSupportTicketsTable.findFirst({
        where: eq(CustomerSupportTicketsTable.ticketId, id)
    })
}

export const createCustomerSupportTicketService = async (CustomerSupportTicket: TICustomerSupportTicket) => {
    await db.insert(CustomerSupportTicketsTable).values(CustomerSupportTicket)
    return "Customer Support Ticket  created successfully";
}

export const updateCustmerSupportTicketService = async (id: number, CustomerSupportTicket: TICustomerSupportTicket) => {
    await db.update(CustomerSupportTicketsTable).set(CustomerSupportTicket).where(eq(CustomerSupportTicketsTable.ticketId, id))
    return "Customer Support Ticket  updated successfully";
}

export const deleteCustomerSupportTicketService = async (id: number) => {
    await db.delete(CustomerSupportTicketsTable).where(eq(CustomerSupportTicketsTable.ticketId, id))
    return "Customer Support Ticket deleted successfully";
}
