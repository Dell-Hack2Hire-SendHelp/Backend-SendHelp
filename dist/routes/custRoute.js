"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const custController_1 = require("../controllers/custController");
const router = (0, express_1.Router)();
const db = new client_1.PrismaClient();
router.post("/purchase", custController_1.createPurchase);
// router.get("/history")
exports.default = router;
