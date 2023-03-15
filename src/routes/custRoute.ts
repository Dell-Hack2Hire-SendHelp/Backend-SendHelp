import { Router } from "express";

import { createPurchase, getMyOrders, getMyOrderById } from "../controllers/custController";
import { isCustomer } from "../middlewares/authMiddlewares";

const router = Router();




router.post("/purchase", isCustomer, createPurchase);
router.get("/myOrders", isCustomer, getMyOrders);
router.get("/myOrder", isCustomer, getMyOrderById);


export default router;