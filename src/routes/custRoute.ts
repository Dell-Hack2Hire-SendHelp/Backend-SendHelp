import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { createPurchase } from "../controllers/custController";

const router = Router();
const db = new PrismaClient();

router.post("/purchase", createPurchase);
// router.get("/history")
router.get("/cookie", (req, res) => {
    res.cookie("test", "yesy");
    // set a cookie to the client with response
    
    res.status(200).json({ message: "Cookie set" });
});

export default router;