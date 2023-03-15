"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddlewares_1 = require("../middlewares/authMiddlewares");
const apeController_1 = require("../controllers/apeController");
const router = (0, express_1.Router)();
router.get('/getAllOrders', authMiddlewares_1.isApe, apeController_1.getAllOrders);
router.get('/getOrderById', authMiddlewares_1.isApe, apeController_1.getOrderById);
exports.default = router;
