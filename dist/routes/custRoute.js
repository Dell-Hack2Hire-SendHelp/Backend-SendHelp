"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const custController_1 = require("../controllers/custController");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const router = (0, express_1.Router)();
router.post("/purchase", authMiddlewares_1.isCustomer, custController_1.createPurchase);
router.get("/myOrders", authMiddlewares_1.isCustomer, custController_1.getMyOrders);
exports.default = router;
