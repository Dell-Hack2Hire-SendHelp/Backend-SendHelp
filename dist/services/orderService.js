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
exports.getAllInReviewOrders = void 0;
const client_1 = require("@prisma/client");
const db_1 = require("./db");
const prisma_pagination_1 = require("prisma-pagination");
const db = db_1.DB.instance;
const paginate = (0, prisma_pagination_1.createPaginator)({ perPage: 10 });
function getAllInReviewOrders({ page, searchByUsername, }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db.order.findMany({
            where: {
                status: client_1.OrderStatus.IN_REVIEW,
                customer: {
                    username: {
                        contains: searchByUsername,
                        mode: "insensitive"
                    }
                }
            },
        });
    });
}
exports.getAllInReviewOrders = getAllInReviewOrders;
