import { Router } from "express";

import { isApe } from "../middlewares/authMiddlewares";
import { getAllOrders } from "../controllers/apeController";

const router = Router();


router.get('/inReviewOrders', isApe, getAllOrders );


export default router;