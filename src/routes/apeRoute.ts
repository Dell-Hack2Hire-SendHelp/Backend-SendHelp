import { Router } from "express";

import { isApe } from "../middlewares/authMiddlewares";
import { getAllOrders, getOrderById } from "../controllers/apeController";

const router = Router();


router.get('/getAllOrders', isApe, getAllOrders );
router.get('/getOrderById', isApe, getOrderById );


export default router;