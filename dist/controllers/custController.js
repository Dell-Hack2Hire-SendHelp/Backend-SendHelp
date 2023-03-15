"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPurchase = void 0;
const orderService_1 = require("../services/orderService");
function createPurchase(req, res) {
    const order = {
        receiversName: req.body.receiversName,
        receiversEmail: req.body.receiversEmail,
        treeNumbers: parseInt(req.body.treeNumbers),
        isCoordRequired: req.body.isCoordRequired,
        message: req.body.message,
        customerId: req.user.id,
    };
    console.log(order);
    (0, orderService_1.insertNewOrder)(order);
    res.status(201).json({ message: "Order created successfully" });
}
exports.createPurchase = createPurchase;
