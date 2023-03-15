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
exports.initializeDefaultOrder = void 0;
const orderService_1 = require("../services/orderService");
function initializeDefaultOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Initializing default orders...");
        const order1 = yield (0, orderService_1.findOrdersWhere)({
            receiver_name: "Customer 1 Order"
        });
        if (order1.length === 0)
            yield (0, orderService_1.insertNewOrder)({
                receiversName: "Customer 1 Order",
                receiversEmail: "customer1@gmail.com",
                treeNumbers: 10,
                customerId: 1,
            });
        console.log("Default orders initialized successfully.");
    });
}
exports.initializeDefaultOrder = initializeDefaultOrder;
