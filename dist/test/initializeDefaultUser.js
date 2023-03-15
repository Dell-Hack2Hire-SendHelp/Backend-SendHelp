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
exports.initializeDefaultUser = void 0;
const authService_1 = require("../services/authService");
const client_1 = require("@prisma/client");
function initializeDefaultUser() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Initializing default users...");
        const customer1 = yield (0, authService_1.findUserByUsername)("customer1");
        const ape1 = yield (0, authService_1.findUserByUsername)("ape1");
        const sukau1 = yield (0, authService_1.findUserByUsername)("sukau1");
        if (!customer1)
            yield (0, authService_1.registerNewUser)("customer1@gmail.com", "customer1", "customer1", "Customer 1", client_1.Role.CUSTOMER);
        if (!ape1)
            yield (0, authService_1.registerNewUser)("ape1@gmail.com", "ape1", "ape1", "Ape 1", client_1.Role.APE);
        if (!sukau1)
            yield (0, authService_1.registerNewUser)("sukau1@gmail.com", "sukau1", "sukau1", "Sukau 1", client_1.Role.PLANTER);
        console.log("Default users initialized successfully.");
    });
}
exports.initializeDefaultUser = initializeDefaultUser;
