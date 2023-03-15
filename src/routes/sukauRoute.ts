import { Router } from "express";

import { isPlanter } from "../middlewares/authMiddlewares";
import { getApprovedOrders, getMySelectedOrders, selectToPlantOrder, completeOrder } from "../controllers/sukauController";

const router = Router();



router.get('/getApprovedOrders', isPlanter, getApprovedOrders );
router.get('/getMySelectedOrders', isPlanter, getMySelectedOrders );
router.post('/selectToPlantOrder', isPlanter, selectToPlantOrder );
router.post('/completeOrder', isPlanter, completeOrder );



export default router;