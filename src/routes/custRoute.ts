import { Router } from "express";

import { createPurchase, getMyOrders } from "../controllers/custController";
import { isCustomer } from "../middlewares/authMiddlewares";

const router = Router();




router.post("/purchase", isCustomer, createPurchase);
router.get("/myOrders", isCustomer, getMyOrders);


export default router;