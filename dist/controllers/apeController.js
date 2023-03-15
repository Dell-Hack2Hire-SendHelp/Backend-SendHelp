"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = void 0;
function getOrderById(req, res) {
    res.status(200).json({ message: "Order found" });
}
exports.getOrderById = getOrderById;
