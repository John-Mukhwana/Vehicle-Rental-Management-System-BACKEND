"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerSupportTicketService = exports.updateCustmerSupportTicketService = exports.createCustomerSupportTicketService = exports.getCustomerSupportTicketService = exports.CustomerSupportTicketService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const CustomerSupportTicketService = async (limit) => {
    // Fetch customer support ticket data
    const ticketsQuery = db_1.default.select()
        .from(schema_1.CustomerSupportTicketsTable);
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
        const user = await db_1.default.select()
            .from(schema_1.usersTable)
            .where((0, drizzle_orm_1.eq)(schema_1.usersTable.userId, ticket.userId))
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
exports.CustomerSupportTicketService = CustomerSupportTicketService;
// export const CustomerSupportTicketService = async (limit?: number): Promise<TSCustomerSupportTicket[] | null> => {
//     if (limit) {
//         return await db.query.CustomerSupportTicketsTable.findMany({
//             limit: limit
//         });
//     }
//     return await db.query.CustomerSupportTicketsTable.findMany();
// }
const getCustomerSupportTicketService = async (id) => {
    // Fetch the customer support ticket data
    const ticket = await db_1.default.select()
        .from(schema_1.CustomerSupportTicketsTable)
        .where((0, drizzle_orm_1.eq)(schema_1.CustomerSupportTicketsTable.ticketId, id))
        .limit(1) // Ensure only one record is returned
        .execute();
    if (!ticket.length) {
        throw new Error(`Customer support ticket with ID ${id} not found.`);
    }
    const ticketData = ticket[0];
    // Fetch user data related to the ticket
    const user = await db_1.default.select()
        .from(schema_1.usersTable)
        .where((0, drizzle_orm_1.eq)(schema_1.usersTable.userId, ticketData.userId))
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
exports.getCustomerSupportTicketService = getCustomerSupportTicketService;
// export const getCustomerSupportTicketService = async (id: number): Promise<TICustomerSupportTicket | undefined> => {
//     return await db.query.CustomerSupportTicketsTable.findFirst({
//         where: eq(CustomerSupportTicketsTable.ticketId, id)
//     })
// }
const createCustomerSupportTicketService = async (CustomerSupportTicket) => {
    await db_1.default.insert(schema_1.CustomerSupportTicketsTable).values(CustomerSupportTicket);
    return "Customer Support Ticket  created successfully";
};
exports.createCustomerSupportTicketService = createCustomerSupportTicketService;
const updateCustmerSupportTicketService = async (id, CustomerSupportTicket) => {
    await db_1.default.update(schema_1.CustomerSupportTicketsTable).set(CustomerSupportTicket).where((0, drizzle_orm_1.eq)(schema_1.CustomerSupportTicketsTable.ticketId, id));
    return "Customer Support Ticket  updated successfully";
};
exports.updateCustmerSupportTicketService = updateCustmerSupportTicketService;
const deleteCustomerSupportTicketService = async (id) => {
    await db_1.default.delete(schema_1.CustomerSupportTicketsTable).where((0, drizzle_orm_1.eq)(schema_1.CustomerSupportTicketsTable.ticketId, id));
    return "Customer Support Ticket deleted successfully";
};
exports.deleteCustomerSupportTicketService = deleteCustomerSupportTicketService;
