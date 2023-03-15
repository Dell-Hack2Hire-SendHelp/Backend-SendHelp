"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = exports.insertNewOrder = exports.findOrdersWhere = exports.findOrderById = exports.findAllOrders = void 0;
const client_1 = require("@prisma/client");
const db_1 = require("./db");
const db = db_1.DB.instance;
function findAllOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.order.findMany();
    });
}
exports.findAllOrders = findAllOrders;
function findOrderById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.order.findUnique({
            where: { id }
        });
    });
}
exports.findOrderById = findOrderById;
function findOrdersWhere(where) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.order.findMany({
            where
        });
    });
}
exports.findOrdersWhere = findOrdersWhere;
function insertNewOrder({ receiversName, receiversEmail, treeNumbers, customerId, isCoordRequired, message = "This goes towards the restoration of the forest corridor along the Lower Kinabatangan, Sabah, malaysia, Borneo.", status = client_1.OrderStatus.IN_REVIEW, }) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.order.create({
            data: {
                receiver_name: receiversName,
                receiver_email: receiversEmail,
                trees_number: treeNumbers,
                customer: {
                    connect: { id: customerId }
                },
                status,
                isCoordRequired,
                message,
            }
        });
        console.log(`Order created successfully at ${new Date().toLocaleString()}`);
    });
}
exports.insertNewOrder = insertNewOrder;
function updateOrder(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.order.update({
            where: { id },
            data
        });
    });
}
exports.updateOrder = updateOrder;
