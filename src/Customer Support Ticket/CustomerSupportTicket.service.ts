import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TICustomerSupportTicket, TSCustomerSupportTicket, CustomerSupportTicketsTable,usersTable } from '../drizzle/schema';

export const    CustomerSupportTicketService = async (limit?: number): Promise<any[] | null> => {
    // Fetch customer support ticket data
    const ticketsQuery = db.select()
        .from(CustomerSupportTicketsTable);
    
    if (limit) {
        ticketsQuery.limit(limit);
    }
    
    const tickets = await ticketsQuery.execute();

    if (!tickets.length) {
        return null;
    }

    // Fetch related user data for each ticket
    const ticketsWithUserData = await Promise.all(tickets.map(async (ticket) => {
        // Fetch user data related to the ticket
        const user = await db.select()
            .from(usersTable)
            .where(eq(usersTable.userId, ticket.userId))
            .limit(1) // Ensure only one record is returned
            .execute();

        const userData = user.length ? user[0] : {
            fullName: '',
            email: '',
            contactPhone: '',
            address: '',
        };

        return {
            ticketId: ticket.ticketId,
            subject: ticket.subject,
            description: ticket.description,
            status: ticket.status,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt,
            user: userData
        };
    }));

    return ticketsWithUserData;
};


// export const CustomerSupportTicketService = async (limit?: number): Promise<TSCustomerSupportTicket[] | null> => {
//     if (limit) {
//         return await db.query.CustomerSupportTicketsTable.findMany({
//             limit: limit
//         });
//     }
//     return await db.query.CustomerSupportTicketsTable.findMany();
// }
export const getCustomerSupportTicketService = async (id: number): Promise<any> => {
    // Fetch the customer support ticket data
    const ticket = await db.select()
        .from(CustomerSupportTicketsTable)
        .where(eq(CustomerSupportTicketsTable.ticketId, id))
        .limit(1) // Ensure only one record is returned
        .execute();

    if (!ticket.length) {
        throw new Error(`Customer support ticket with ID ${id} not found.`);
    }

    const ticketData = ticket[0];

    // Fetch user data related to the ticket
    const user = await db.select()
        .from(usersTable)
        .where(eq(usersTable.userId, ticketData.userId))
        .limit(1) // Ensure only one record is returned
        .execute();

    const userData = user.length ? user[0] : {
        fullName: '',
        email: '',
        contactPhone: '',
        address: '',
    };

    // Format the ticket data with related user details
    return {
        ticketId: ticketData.ticketId,
        subject: ticketData.subject,
        description: ticketData.description,
        status: ticketData.status,
        createdAt: ticketData.createdAt,
        updatedAt: ticketData.updatedAt,
        user: userData
    };
};

// export const getCustomerSupportTicketService = async (id: number): Promise<TICustomerSupportTicket | undefined> => {
//     return await db.query.CustomerSupportTicketsTable.findFirst({
//         where: eq(CustomerSupportTicketsTable.ticketId, id)
//     })
// }

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
