"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerSupportTicket = exports.updateCustmerSupportTicket = exports.createCustomerSupportTicket = exports.getCustomerSupportTicket = exports.listCustomerSupportTicket = void 0;
const CustomerSupportTicket_service_1 = require("./CustomerSupportTicket.service");
const listCustomerSupportTicket = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, CustomerSupportTicket_service_1.CustomerSupportTicketService)(limit);
        if (data == null || data.length == 0) {
            return c.text("Customer Ticket  not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listCustomerSupportTicket = listCustomerSupportTicket;
const getCustomerSupportTicket = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const CustomerSupportTicket = await (0, CustomerSupportTicket_service_1.getCustomerSupportTicketService)(id);
    if (CustomerSupportTicket == undefined) {
        return c.text("Customer Support Ticket not found", 404);
    }
    return c.json(CustomerSupportTicket, 200);
};
exports.getCustomerSupportTicket = getCustomerSupportTicket;
const createCustomerSupportTicket = async (c) => {
    try {
        const CustomerSupportTicket = await c.req.json();
        // Convert date strings to Date objects
        if (CustomerSupportTicket.createdAt) {
            CustomerSupportTicket.createdAt = new Date(CustomerSupportTicket.createdAt);
        }
        if (CustomerSupportTicket.updatedAt) {
            CustomerSupportTicket.updatedAt = new Date(CustomerSupportTicket.updatedAt);
        }
        const createdCustomerSupportTicket = await (0, CustomerSupportTicket_service_1.createCustomerSupportTicketService)(CustomerSupportTicket);
        if (!createdCustomerSupportTicket)
            return c.text("Customer Support Ticket not created", 404);
        return c.json({ msg: exports.createCustomerSupportTicket }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createCustomerSupportTicket = createCustomerSupportTicket;
const updateCustmerSupportTicket = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
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
        const searchedUser = await (0, CustomerSupportTicket_service_1.getCustomerSupportTicketService)(id);
        if (searchedUser == undefined)
            return c.text("Customer Support Ticket not found", 404);
        // get the data and update it
        const res = await (0, CustomerSupportTicket_service_1.updateCustmerSupportTicketService)(id, CustomerSupportTicket);
        // return a success message
        if (!res)
            return c.text("Customer Support Ticket not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateCustmerSupportTicket = updateCustmerSupportTicket;
const deleteCustomerSupportTicket = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const user = await (0, CustomerSupportTicket_service_1.getCustomerSupportTicketService)(id);
        if (user == undefined)
            return c.text("Customer Support Ticket found", 404);
        //deleting the user
        const res = await (0, CustomerSupportTicket_service_1.deleteCustomerSupportTicketService)(id);
        if (!res)
            return c.text("Cutomer Suppor Ticket deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteCustomerSupportTicket = deleteCustomerSupportTicket;
