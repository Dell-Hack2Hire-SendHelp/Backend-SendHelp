import { Router } from "express";

import { isPlanter } from "../middlewares/authMiddlewares";
import { getApprovedOrders, getMySelectedOrders, selectToPlantOrder } from "../controllers/sukauController";

const router = Router();



router.get('/getApprovedOrders', isPlanter, getApprovedOrders );
router.get('/getMySelectedOrders', isPlanter, getMySelectedOrders );
router.post('/selectToPlantOrder', isPlanter, selectToPlantOrder );



export default router;