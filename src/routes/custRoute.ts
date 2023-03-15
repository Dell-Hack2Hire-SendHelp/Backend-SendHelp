import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { createPurchase } from "../controllers/custController";

const router = Router();
const db = new PrismaClient();

router.post("/purchase", createPurchase);
// router.get("/history")

export default router;