
import { Request, Response } from "express";
import { isApe } from "../middlewares/authMiddlewares";



export function getOrderById(req: Request, res: Response) {
    res.status(200).json({ message: "Order found" });
}