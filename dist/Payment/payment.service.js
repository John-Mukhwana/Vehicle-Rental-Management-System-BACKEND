"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePaymentService = exports.updatePaymentService = exports.createPaymentService = exports.getPaymentService = exports.paymentService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../drizzle/db"));
const schema_1 = require("../drizzle/schema");
const paymentService = async (limit) => {
    if (limit) {
        return await db_1.default.query.PaymentsTable.findMany({
            limit: limit
        });
    }
    return await db_1.default.query.PaymentsTable.findMany();
};
exports.paymentService = paymentService;
const getPaymentService = async (id) => {
    return await db_1.default.query.PaymentsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.PaymentsTable.paymentId, id)
    });
};
exports.getPaymentService = getPaymentService;
const createPaymentService = async (payment) => {
    await db_1.default.insert(schema_1.PaymentsTable).values(payment);
    return "Payment created successfully";
};
exports.createPaymentService = createPaymentService;
const updatePaymentService = async (id, user) => {
    await db_1.default.update(schema_1.PaymentsTable).set(user).where((0, drizzle_orm_1.eq)(schema_1.PaymentsTable.paymentId, id));
    return "Payment updated successfully";
};
exports.updatePaymentService = updatePaymentService;
const deletePaymentService = async (id) => {
    await db_1.default.delete(schema_1.PaymentsTable).where((0, drizzle_orm_1.eq)(schema_1.PaymentsTable.paymentId, id));
    return "Payment deleted successfully";
};
exports.deletePaymentService = deletePaymentService;
