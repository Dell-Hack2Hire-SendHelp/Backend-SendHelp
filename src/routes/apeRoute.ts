import { Router } from "express";

import { isApe } from "../middlewares/authMiddlewares";
import { getAllOrders, getOrderById, updateOrderStatus } from "../controllers/apeController";

const router = Router();


router.get('/getAllOrders', isApe, getAllOrders );
router.get('/getOrderById', isApe, getOrderById );
router.get('/updateOrderStatus', isApe, updateOrderStatus );

export default router;