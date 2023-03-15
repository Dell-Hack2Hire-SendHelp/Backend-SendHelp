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
exports.findAllOrders = exports.findOrderByReceiverName = exports.findOrderById = exports.insertNewOrder = void 0;
const client_1 = require("@prisma/client");
const db_1 = require("./db");
const prisma_pagination_1 = require("prisma-pagination");
const db = db_1.DB.instance;
const paginate = (0, prisma_pagination_1.createPaginator)({ perPage: 10 });
function filterObj(status, searchByUsername) {
    const filter = { where: {} };
    if (status)
        filter.where.status = status;
    if (searchByUsername)
        filter.where.customer = { username: { contains: searchByUsername, mode: "insensitive" } };
    return filter;
}
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
function findOrderById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.order.findUnique({
            where: { id }
        });
    });
}
exports.findOrderById = findOrderById;
function findOrderByReceiverName(receiverName) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.order.findFirst({
            where: {
                receiver_name: receiverName
            }
        });
    });
}
exports.findOrderByReceiverName = findOrderByReceiverName;
function findAllOrders({ page = 1, searchByUsername, status, }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield paginate(db.order, filterObj(status, searchByUsername), { page, });
    });
}
exports.findAllOrders = findAllOrders;
