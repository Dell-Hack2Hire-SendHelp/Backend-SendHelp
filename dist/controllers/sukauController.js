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
exports.completeOrder = exports.selectToPlantOrder = exports.getMySelectedOrders = exports.getApprovedOrders = exports.getOrderById = void 0;
const client_1 = require("@prisma/client");
const orderService_1 = require("../services/orderService");
const mailService_1 = require("../services/mailService");
function getOrderById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.query.id);
        const order = yield (0, orderService_1.findOrderById)(id);
        res.status(200).json(order);
    });
}
exports.getOrderById = getOrderById;
function getApprovedOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield (0, orderService_1.findOrdersWhere)({
            status: client_1.OrderStatus.APPROVED
        });
        res.status(200).json(orders);
    });
}
exports.getApprovedOrders = getApprovedOrders;
function getMySelectedOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield (0, orderService_1.findOrdersWhere)({
            status: client_1.OrderStatus.PLANTING,
            planter: {
                id: req.user.id,
            }
        });
        res.status(200).json(orders);
    });
}
exports.getMySelectedOrders = getMySelectedOrders;
function selectToPlantOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.body.id);
        const order = yield (0, orderService_1.updateOrder)(id, {
            status: client_1.OrderStatus.PLANTING,
            planter_id: req.user.id,
        });
        (0, mailService_1.sendStatusEmail)(order.receiver_email, client_1.OrderStatus.PLANTING);
        res.status(200).json({ message: "Order selected successfully", order });
    });
}
exports.selectToPlantOrder = selectToPlantOrder;
function completeOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.body.id);
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        const order = yield (0, orderService_1.updateOrder)(id, {
            status: client_1.OrderStatus.COMPLETED,
            latitude,
            longitude,
        });
        (0, mailService_1.sendStatusEmail)(order.receiver_email, client_1.OrderStatus.COMPLETED);
        res.status(200).json({ message: "Order completed successfully", order });
    });
}
exports.completeOrder = completeOrder;
