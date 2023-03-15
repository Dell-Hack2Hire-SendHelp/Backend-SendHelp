import { Router } from "express";

import { createPurchase } from "../controllers/custController";
import { isCustomer } from "../middlewares/authMiddlewares";

const router = Router();




router.post("/purchase", isCustomer, createPurchase);


export default router;