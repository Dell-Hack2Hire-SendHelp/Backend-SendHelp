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
exports.getMyOrders = exports.createPurchase = void 0;
const orderService_1 = require("../services/orderService");
function createPurchase(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = {
            receiversName: req.body.receiversName,
            receiversEmail: req.body.receiversEmail,
            treeNumbers: parseInt(req.body.treeNumbers),
            isCoordRequired: req.body.isCoordRequired,
            message: req.body.message,
            customerId: req.user.id,
        };
        yield (0, orderService_1.insertNewOrder)(order);
        res.status(201).json({ message: "Order created successfully" });
    });
}
exports.createPurchase = createPurchase;
function getMyOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield (0, orderService_1.findOrdersWhere)({
            customer: {
                id: req.user.id,
            }
        });
        res.status(200).json(orders);
    });
}
exports.getMyOrders = getMyOrders;
