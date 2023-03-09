"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const DB = {
    instance: new client_1.PrismaClient(),
};
Object.freeze(DB);
exports.default = DB;
