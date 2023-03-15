"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPurchase = void 0;
const orderService_1 = require("../services/orderService");
function createPurchase(req, res) {
    const { order } = req.body;
    order.customerId = req.user.id;
    (0, orderService_1.insertNewOrder)(order);
    res.status(201).json({ message: "Order created successfully" });
}
exports.createPurchase = createPurchase;
