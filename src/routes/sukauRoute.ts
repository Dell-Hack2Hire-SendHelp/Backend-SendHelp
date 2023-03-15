import { Router } from "express";

import { isPlanter } from "../middlewares/authMiddlewares";
import { getApprovedOrders, getMySelectedOrders, selectToPlantOrder, getOrderById, completeOrder } from "../controllers/sukauController";

const router = Router();



router.get('/getApprovedOrders', isPlanter, getApprovedOrders );
router.get('/getMySelectedOrders', isPlanter, getMySelectedOrders );
router.post('/selectToPlantOrder', isPlanter, selectToPlantOrder );
router.get('/getOrderById', isPlanter, getOrderById)
router.post('/completeOrder', isPlanter, completeOrder );



export default router;