"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerSupportTicketRouter = void 0;
const hono_1 = require("hono");
const CustomerSupportTicket_controller_1 = require("./CustomerSupportTicket.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
const bearAuth_1 = require("../middleware/bearAuth");
exports.customerSupportTicketRouter = new hono_1.Hono();
//get all users      api/users
exports.customerSupportTicketRouter.get("/tickets", bearAuth_1.adminRoleAuth, CustomerSupportTicket_controller_1.listCustomerSupportTicket);
//get a single user    api/users/1
exports.customerSupportTicketRouter.get("/tickets/:id", bearAuth_1.userOrAdminRoleAuth, CustomerSupportTicket_controller_1.getCustomerSupportTicket);
// create a user 
exports.customerSupportTicketRouter.post("/tickets", (0, zod_validator_1.zValidator)('json', validators_1.ticketSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), CustomerSupportTicket_controller_1.createCustomerSupportTicket);
//update a user
exports.customerSupportTicketRouter.put("/tickets/:id", CustomerSupportTicket_controller_1.updateCustmerSupportTicket);
exports.customerSupportTicketRouter.delete("/tickets/:id", CustomerSupportTicket_controller_1.deleteCustomerSupportTicket);
