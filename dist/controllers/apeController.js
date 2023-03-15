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
exports.getAllOrders = void 0;
const client_1 = require("@prisma/client");
const orderService_1 = require("../services/orderService");
function getAllOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const status = req.query.status ? client_1.OrderStatus[req.query.status] : undefined;
        const searchByUsername = req.query.username;
        const queryRes = yield (0, orderService_1.findAllOrders)({ page, status, searchByUsername });
        res.status(200).json(queryRes);
    });
}
exports.getAllOrders = getAllOrders;
