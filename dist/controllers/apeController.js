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
exports.updateOrderStatus = exports.getOrderById = exports.getAllOrders = void 0;
const client_1 = require("@prisma/client");
const orderService_1 = require("../services/orderService");
const mailService_1 = require("../services/mailService");
function getAllOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield (0, orderService_1.findAllOrders)();
        res.status(200).json(orders);
    });
}
exports.getAllOrders = getAllOrders;
function getOrderById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.query.id);
        const order = yield (0, orderService_1.findOrderById)(id);
        res.status(200).json(order);
    });
}
exports.getOrderById = getOrderById;
function updateOrderStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.body.id);
        const status = client_1.OrderStatus[req.body.status];
        const order = yield (0, orderService_1.updateOrder)(id, { status });
        (0, mailService_1.sendStatusEmail)(order.receiver_email, status);
        res.status(200).json({ message: "Order status updated successfully", order });
    });
}
exports.updateOrderStatus = updateOrderStatus;
