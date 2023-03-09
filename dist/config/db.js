"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const client_1 = require("@prisma/client");
// Singleton pattern for the PrismaClient instance. Access via DB.instance
exports.DB = {
    instance: new client_1.PrismaClient(),
};
Object.freeze(exports.DB);
