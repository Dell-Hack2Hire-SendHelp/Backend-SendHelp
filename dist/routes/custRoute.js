"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const custController_1 = require("../controllers/custController");
const router = (0, express_1.Router)();
const db = new client_1.PrismaClient();
router.post("/purchase", custController_1.createPurchase);
// router.get("/history")
router.get("/cookie", (req, res) => {
    res.cookie("test", "yesy");
    // set a cookie to the client with response
    res.status(200).json({ message: "Cookie set" });
});
exports.default = router;
